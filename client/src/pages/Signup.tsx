import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", { email, password })
      if(res!=null){navigate("/login")} // redirect to login
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </form>
          <p className="text-sm mt-4 text-center">
            Already have an account? <a href="/" className="text-blue-600 hover:underline">Login</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
