import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
export interface ILogEntry extends mongoose.Document {
  method: string;
  url: string;
  statusCode: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
  responseTimeMs?: number;
  _id:Types.ObjectId; // Ensure _id is included in the interface
}

const logEntrySchema = new mongoose.Schema<ILogEntry>(
  {
    method: String,
    url: String,
    statusCode: Number,
    timestamp: { type: Date, default: Date.now },
    userAgent: String,
    ip: String,
    responseTimeMs: Number,
  },
  { versionKey: false }
);

const LogEntry = mongoose.model<ILogEntry>('LogEntry', logEntrySchema);
export default LogEntry;
