// src/components/ui/ProxyTab.tsx
import  { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // <--- FIX IS HERE: Add this import

const ProxyTab = () => {
  const { token } = useAuth();
  const [loggingEnabled, setLoggingEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  const fetchProxyConfig = async () => {
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const config = await api.getProxyConfig(token);
      setLoggingEnabled(config.loggingEnabled);
      setUpdateSuccess(null); // Reset update status
    } catch (err: any) {
      console.error("Failed to fetch proxy config:", err);
      setError(err.message || "Failed to load proxy configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProxyConfig();
  }, [token]);

  const handleToggleLogging = async (checked: boolean) => {
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }
    setLoggingEnabled(checked); // Optimistic update
    setIsUpdating(true);
    setUpdateSuccess(null);
    try {
      await api.updateProxyConfig(token, checked);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(null), 3000); // Clear success message after 3 seconds
    } catch (err: any) {
      console.error("Failed to update proxy config:", err);
      setError(err.message || "Failed to update logging setting.");
      setLoggingEnabled(!checked); // Revert on error
      setUpdateSuccess(false);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Proxy Configuration</h2>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {updateSuccess === true && (
        <Alert className="bg-green-100 border-green-400 text-green-700">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Logging setting updated successfully.
          </AlertDescription>
        </Alert>
      )}
      {updateSuccess === false && (
        <Alert variant="destructive">
          <AlertTitle>Update Failed</AlertTitle>
          <AlertDescription>
            Failed to update logging setting. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-32" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Switch
            id="logging-toggle"
            checked={loggingEnabled}
            onCheckedChange={handleToggleLogging}
            disabled={isUpdating}
          />
          <Label htmlFor="logging-toggle">Enable Proxy Logging</Label>
          {isUpdating && (
            <p className="text-sm text-gray-500 ml-2">Updating...</p>
          )}
        </div>
      )}
      <Button onClick={fetchProxyConfig} disabled={isLoading}>
        Refresh Config
      </Button>
    </div>
  );
};

export default ProxyTab;
