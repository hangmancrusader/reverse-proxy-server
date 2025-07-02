import { useEffect, useState } from "react"
import axios from "axios"

const LogsTab = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get("http://localhost:5000/api/logs")
      setLogs(res.data)
    }
    fetchLogs()
  }, [])

  return (
    <table className="w-full text-left border">
      <thead>
        <tr>
          <th className="p-2 border">Method</th>
          <th className="p-2 border">URL</th>
          <th className="p-2 border">Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log: any) => (
          <tr key={log._id}>
            <td className="p-2 border">{log.method}</td>
            <td className="p-2 border">{log.url}</td>
            <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LogsTab
