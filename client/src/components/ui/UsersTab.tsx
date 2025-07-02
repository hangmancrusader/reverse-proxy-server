import { useEffect, useState } from "react"
import axios from "axios"

const UsersTab = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/proxy/users")
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="grid gap-4">
      {users.map((user: any) => (
        <div key={user.id} className="border p-4 rounded shadow-sm">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default UsersTab
