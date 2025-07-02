import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password
      });
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <CardContent className="space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Log In
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-2 px-3 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-2 px-3 text-lg"
              />
            </div>
            <Button type="submit" className="w-full py-2.5 text-lg">
              Login
            </Button>
            {error && (
              <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
            )}
          </form>
          <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {" "}
              
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
