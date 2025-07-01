import mongoose from 'mongoose';

export interface ILogEntry extends mongoose.Document {
  method: string;
  url: string;
  statusCode: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
  responseTimeMs?: number;
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
