import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Mail, Book as BookIcon, Library, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";
const API_BASE_URL = 'http://localhost:8080/api';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, isAdmin } = useAuth();
  const [user, setUser] = useState(null);
  const [readingLists, setReadingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/users/${id}`);
        setUser(userResponse.data);

        // Fetch reading lists for this specific user
        const readingListsResponse = await axios.get(`${API_BASE_URL}/readinglists/user/${id}`);
        setReadingLists(readingListsResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data.",
          variant: "destructive",
        });
        // Redirect to users list on error
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id, toast, navigate]);

  const getInitials = (username) => {
    return username.split('_').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium mb-2">User not found</h3>
        <Button asChild>
          <Link to="/users">Back to Users</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-accent text-lg">{user.firstName} {user.lastName}</p>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="card-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-2 border-accent">
              <AvatarImage src={user.profilePictureUrl || ""} alt={`@${user.username}`} />
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-2xl">
                {getInitials(user.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.bio && <p className="text-muted-foreground leading-relaxed">{user.bio}</p>}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <BookIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Books Read:</span>
            </div>
            <Badge variant="secondary">{user.booksRead || 0}</Badge>
          </div>
          {user.favoriteGenre && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Favorite Genre:</span>
              </div>
              <Badge variant="secondary">{user.favoriteGenre}</Badge>
            </div>
          )}
          <div className="flex gap-2 pt-4">
            {(isAdmin || (authUser && authUser.id.toString() === id)) && (
                <Button variant="secondary" asChild className="flex-1">
                    <Link to={`/users/edit/${user.id}`} className="flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit Profile</span>
                    </Link>
                </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reading Lists Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Library className="h-5 w-5" />
          <span>Reading Lists ({readingLists.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingLists.map((list) => (
            <Card key={list.id} className="card-elegant">
              <CardHeader>
                <CardTitle className="line-clamp-2">{list.name}</CardTitle>
                <CardDescription>{list.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{list.status}</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Created: {new Date(list.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
          {readingLists.length === 0 && (
            <p className="text-muted-foreground col-span-full">This user has no reading lists.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;