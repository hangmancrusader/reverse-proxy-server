// src/middleware/log.middleware.ts
import { Request, Response, NextFunction } from 'express';
import LogEntry, { ILogEntry } from '../models/LogEntry'; // Import ILogEntry interface
import { proxyConfig } from '../config/proxyConfig';

// Extend Response type to include a reference to the log entry ID
declare module 'express' {
    interface Response {
        locals: {
            logId?: string; // To store the ID of the created log entry
        };
    }
}

export const logRequestMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!proxyConfig.loggingEnabled) {
        return next();
    }

    const proxiedPath = req.originalUrl.replace('/api/proxy', '');

    try {
        // Explicitly type the 'log' variable as ILogEntry
        const log: ILogEntry = await LogEntry.create({
            method: req.method,
            url: proxiedPath || '/',
            statusCode: 0,
            userAgent: req.headers['user-agent'],
            ip: req.ip || req.socket.remoteAddress,
            responseTimeMs: 0,
            timestamp: new Date()
        });

        // Now, TypeScript knows 'log' is an ILogEntry, which extends mongoose.Document,
        // so it will correctly infer that '_id' exists and has a 'toString()' method.
        res.locals.logId = log._id.toString();

        console.log(`Initial Log Entry Created with ID: ${res.locals.logId}`);
        next();
    } catch (err) {
        console.error('Error creating initial log entry:', err);
        next();
    }
};