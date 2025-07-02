// src/pages/Dashboard.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTab from "@/components/ui/UsersTab";
import LogsTab from "@/components/ui/LogsTab";
import ProxyTab from "@/components/ui/ProxyTab";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"; 

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto"> {}
      <div className="flex justify-between items-center mb-6"> 
        <h1 className="text-3xl font-bold">Admin Dashboard</h1> 
        <Button onClick={logout} variant="outline">Logout</Button> 
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3"> 
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="proxy">Proxy Settings</TabsTrigger> 
        </TabsList>
        <TabsContent value="users" className="mt-4"><UsersTab /></TabsContent> 
        <TabsContent value="logs" className="mt-4"><LogsTab /></TabsContent>
        <TabsContent value="proxy" className="mt-4"><ProxyTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;