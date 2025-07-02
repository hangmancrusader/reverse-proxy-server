process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import LogEntry from '../models/LogEntry';

export const proxyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fullPath = req.originalUrl.replace('/api/proxy', '');
 
  const targetURL = `https://jsonplaceholder.typicode.com/users`;
  const start = Date.now();
    console.log(`Proxying request to: ${targetURL}`);
    let log = null;

  try {
    // 1️⃣ Create log BEFORE proxying
    log = await LogEntry.create({
      method: req.method,
      url: fullPath,
      statusCode: 0, // placeholder
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      responseTimeMs: 0,
      timestamp: new Date()
    });
    console.log('Log Entry Created:', log._id);
    } catch (err) {console.error('Error creating log entry:', err);}




  try {
    const response = await axios({
      method: req.method as any, // (Optional) cast if TS complains
      url: targetURL,
      data: req.body,
      headers: req.headers,
    });

    const duration = Date.now() - start;

    const logEntry = await LogEntry.create({
      method: req.method,
      url: req.path,
      statusCode: response.status,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      responseTimeMs: duration,
    });
    console.log('Log Entry Created:', logEntry._id);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Proxy Error:', error?.message);
    res.status(502).json({ message: 'Proxy request failed' });
  }
};
//loging enabled logic 
/*import { proxyConfig } from "../config/proxyConfig"

// Inside your proxy route
if (proxyConfig.loggingEnabled) {
  // Save to DB (method, URL, timestamp)
  const log = new Log({
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date(),
  })
  await log.save()
}
*/