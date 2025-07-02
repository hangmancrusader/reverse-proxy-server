import { useEffect, useState } from "react"
import axios from "axios"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const ProxyTab = () => {
  const [loggingEnabled, setLoggingEnabled] = useState(true)

  // Optional: fetch current status from backend on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/proxy/config")
        setLoggingEnabled(res.data.loggingEnabled)
      } catch (err) {
        console.error("Failed to fetch proxy config:", err)
      }
    }
    fetchConfig()
  }, [])

  const handleToggleLogging = async () => {
    try {
      const newStatus = !loggingEnabled
      setLoggingEnabled(newStatus)
      await axios.patch("http://localhost:5000/api/proxy/config", {
        loggingEnabled: newStatus,
      })
    } catch (err) {
      console.error("Failed to update logging config:", err)
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-4">
        <Switch
          id="logging-switch"
          checked={loggingEnabled}
          onCheckedChange={handleToggleLogging}
        />
        <Label htmlFor="logging-switch" className="text-base">
          {loggingEnabled ? "Logging Enabled" : "Logging Disabled"}
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Toggle this to enable or disable logging of proxied requests.
      </p>
    </div>
  )
}

export default ProxyTab
