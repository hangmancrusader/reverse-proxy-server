// src/pages/Dashboard.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersTab from "@/components/ui/UsersTab"
import LogsTab from "@/components/ui/LogsTab"
import ProxyTab from "@/components/ui/ProxyTab"
import { useAuth } from "@/context/AuthContext"

const Dashboard = () => {
  const { logout } = useAuth()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button onClick={logout} className="text-sm underline">Logout</button>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="proxy">Proxy Rules</TabsTrigger>
        </TabsList>
        <TabsContent value="users"><UsersTab /></TabsContent>
        <TabsContent value="logs"><LogsTab /></TabsContent>
        <TabsContent value="proxy"><ProxyTab /></TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
