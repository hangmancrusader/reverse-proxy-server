import { Request, Response } from 'express';
import LogEntry from '../models/LogEntry';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { method, url, startDate, endDate } = req.query;
    const query: any = {};

    if (method) query.method = method;
    if (url) query.url = url;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate as string);
      if (endDate) query.timestamp.$lte = new Date(endDate as string);
    }

    const logs = await LogEntry.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
