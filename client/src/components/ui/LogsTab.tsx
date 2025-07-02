
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { DataTable } from "@/components/custom/DataTable";
import { logColumns, type LogEntry } from "@/components/custom/LogTableColumns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const LogsTab = () => {
    const { token } = useAuth();
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            if (!token) {
                setError("Authentication token not found. Please log in.");
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const data = await api.getLogs(token);
                setLogs(data);
            } catch (err: any) {
                console.error("Failed to fetch logs:", err);
                setError(err.message || "Failed to load logs. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, [token]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Proxy Logs</h2>
            {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <DataTable data={logs} columns={logColumns} isLoading={isLoading} emptyMessage="No logs found. Make some proxy requests!" />
        </div>
    );
};

export default LogsTab;