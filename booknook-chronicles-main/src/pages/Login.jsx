import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth(); // Get the login function from AuthProvider

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(credentials.username, credentials.password);
      
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/"); // Redirect to home or previous page
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Login failed. Check your username and password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 flex justify-center items-start pt-16">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to BookNook</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username/Email</Label>
              <Input 
                id="username" 
                value={credentials.username} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={credentials.password} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm text-muted-foreground pt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent hover:underline">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;