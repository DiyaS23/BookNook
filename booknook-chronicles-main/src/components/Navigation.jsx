import { Link, useLocation } from "react-router-dom";
import { Book, Users, Library, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { LogIn, LogOut, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/books", label: "Books", icon: Book },
    { path: "/users", label: "Users", icon: Users },
    { path: "/reading-lists", label: "Reading Lists", icon: Library },
  ];

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BookNook
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/users/${user.id}`} className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                  </Link>
                </Button>
                <Button variant="secondary" size="sm" onClick={logout} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/register" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Book className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;