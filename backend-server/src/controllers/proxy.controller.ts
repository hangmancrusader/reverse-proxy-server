import { Request, Response } from "express";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import LogEntry, { ILogEntry } from "../models/LogEntry";
import { proxyConfig } from "../config/proxyConfig";

const TARGET_BASE_URL = "https://jsonplaceholder.typicode.com";

export const proxyHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const start = Date.now();
  const logId = res.locals.logId; // Retrieve log ID from res.locals

  // req.params.path will contain the wildcard segment, e.g., 'users/123'
  const capturedPath = req.params.path || ""; 

  // Construct the full target URL using the captured path
  const targetURL = `${TARGET_BASE_URL}/${capturedPath}`;

  console.log(`Proxying request to: ${targetURL}`);

  try {
    // Prepare headers to forward.
    const headersToForward: Record<string, string | string[] | undefined> = {
      ...req.headers
    };
    // Clean up headers that should not be forwarded
    delete headersToForward.host; // The host header should reflect the target server
    delete headersToForward.connection; // Node.js manages connections
    delete headersToForward["content-length"]; // Axios will calculate this correctly

    headersToForward["x-forwarded-for"] = req.ip || req.socket.remoteAddress;

    // Axios configuration for the outgoing request
    const axiosConfig: AxiosRequestConfig = {
      method: req.method as AxiosRequestConfig["method"],
      url: targetURL,
      data: req.body,
      headers: headersToForward,
      validateStatus: (status) => true,
      responseType: "arraybuffer"
    };

    const response: AxiosResponse = await axios(axiosConfig);

    const duration = Date.now() - start;

    // Update the log entry if it was created
    if (logId && proxyConfig.loggingEnabled) {
      try {
        await LogEntry.findByIdAndUpdate(logId, {
          statusCode: response.status,
          responseTimeMs: duration
        });
        console.log(`Log Entry Updated: ${logId}`);
      } catch (updateErr) {
        console.error(`Error updating log entry ${logId}:`, updateErr);
      }
    }

    // Forward all headers from the target response back to the client
    Object.keys(response.headers).forEach((key) => {
      if (
        key.toLowerCase() === "transfer-encoding" ||
        key.toLowerCase() === "content-encoding"
      ) {
        return;
      }
      res.setHeader(key, response.headers[key]);
    });

    // Set the status code from the target response
    res.status(response.status);

    // Send the response data back to the client.

    res.send(response.data);
  } catch (error: any) {
    const duration = Date.now() - start;
    console.error("Proxy Error:", error?.message);

    // Determine the appropriate status code for the error response
    const statusCode = error.response?.status || 502;
    const errorMessage = error.response?.data || {
      message: "Proxy request failed or target unreachable"
    };

    // Update log entry with error status if it exists
    if (logId && proxyConfig.loggingEnabled) {
      try {
        await LogEntry.findByIdAndUpdate(logId, {
          statusCode: statusCode,
          responseTimeMs: duration,
          errorMessage: error?.message // Add an error message field to your LogEntry model if desired
        });
        console.log(`Log Entry Updated with error status: ${logId}`);
      } catch (updateErr) {
        console.error(
          `Error updating log entry with error status ${logId}:`,
          updateErr
        );
      }
    }

    // Send an error response to the client
    res.status(statusCode).json(errorMessage);
  }
};
