import { RequestHandler } from "express";
import { proxyConfig } from "../config/proxyConfig";

export const getProxyConfig: RequestHandler = async (req, res) => {
  try {
    res.status(200).json(proxyConfig);
  } catch (error) {
    console.error("Error getting proxy config:", error);
    res.status(500).json({ message: "Failed to retrieve config" });
  }
};

export const updateProxyConfig: RequestHandler = async (req, res) => {
  try {
    const { loggingEnabled } = req.body;

    if (typeof loggingEnabled !== "boolean") {
      res
        .status(400)
        .json({ message: "Invalid input: loggingEnabled must be boolean" });
      return;
    }

    proxyConfig.loggingEnabled = loggingEnabled;
    res.status(200).json({ message: "Config updated", loggingEnabled });
  } catch (error) {
    console.error("Error updating proxy config:", error);
    res.status(500).json({ message: "Failed to update config" });
  }
};
