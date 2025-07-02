
import  { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { DataTable } from "@/components/custom/DataTable";
import { userColumns, type User } from "@/components/custom/UserTableColumns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; 

const UsersTab = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await api.getUsers(token);
        setUsers(data);
      } catch (err: any) {
        console.error("Failed to fetch users:", err);
        setError(err.message || "Failed to load users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Users from Proxy API</h2>
      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <DataTable
        data={users}
        columns={userColumns}
        isLoading={isLoading}
        emptyMessage="No users found."
      />
    </div>
  );
};

export default UsersTab;
