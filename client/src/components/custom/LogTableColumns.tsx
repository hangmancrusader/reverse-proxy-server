
import React from 'react'; 

export interface LogEntry {
    _id: string;
    method: string;
    url: string;
    statusCode: number;
    timestamp: string;
    userAgent?: string;
    ip?: string;
    responseTimeMs?: number;
    errorMessage?: string;
}


type ColumnDefinition<T> = {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
};


export const logColumns: ColumnDefinition<LogEntry>[] = [
    { header: "ID", accessor: "_id" },
    { header: "Method", accessor: "method" },
    { header: "URL", accessor: "url" },
    { header: "Status", accessor: "statusCode" },
    { header: "Response Time (ms)", accessor: "responseTimeMs" },
    {
        header: "Timestamp",
        
        accessor: (row: LogEntry) => new Date(row.timestamp).toLocaleString(),
    },
    { header: "IP", accessor: "ip" },
    { header: "Error", accessor: "errorMessage" },
];