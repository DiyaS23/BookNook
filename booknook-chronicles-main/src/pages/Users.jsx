// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Plus, Search, Eye, Mail, Calendar } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();

//   // Mock data for demonstration
//   const mockUsers = [
//     {
//       id: 1,
//       username: "bookworm_sarah",
//       email: "sarah@example.com",
//       joinDate: "2023-01-15",
//       booksRead: 42,
//       favoriteGenre: "Fiction"
//     },
//     {
//       id: 2,
//       username: "reading_enthusiast",
//       email: "john@example.com",
//       joinDate: "2023-03-22",
//       booksRead: 28,
//       favoriteGenre: "Sci-Fi"
//     },
//     {
//       id: 3,
//       username: "novel_hunter",
//       email: "emily@example.com",
//       joinDate: "2023-05-10",
//       booksRead: 35,
//       favoriteGenre: "Mystery"
//     }
//   ];

//   useEffect(() => {
//     // Simulate API call
//     const fetchUsers = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         setUsers(mockUsers);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch users",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [toast]);

//   const filteredUsers = users.filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDeleteUser = async (userId) => {
//     try {
//       setUsers(users.filter(user => user.id !== userId));
//       toast({
//         title: "Success",
//         description: "User deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete user",
//         variant: "destructive",
//       });
//     }
//   };

//   const getInitials = (username) => {
//     return username.split('_').map(part => part[0]).join('').toUpperCase().slice(0, 2);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

  // return (
  //   <div className="space-y-8">
  //     {/* Header */}
  //     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  //       <div>
  //         <h1 className="text-3xl font-bold mb-2">Reading Community</h1>
  //         <p className="text-muted-foreground">Connect with fellow book lovers</p>
  //       </div>
  //       <Button variant="secondary" asChild>
  //         <Link to="/users/add" className="flex items-center space-x-2">
  //           <Plus className="h-4 w-4" />
  //           <span>Add User</span>
  //         </Link>
  //       </Button>
  //     </div>

  //     {/* Search */}
  //     <div className="relative max-w-md">
  //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
  //       <Input
  //         placeholder="Search users..."
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //         className="pl-10"
  //       />
  //     </div>

  //     {/* Users Grid */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {filteredUsers.map((user) => (
  //         <Card key={user.id} className="card-elegant group">
  //           <CardHeader>
  //             <div className="flex items-center space-x-4">
  //               <Avatar className="h-12 w-12">
  //                 <AvatarImage src="" />
  //                 <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
  //                   {getInitials(user.username)}
  //                 </AvatarFallback>
  //               </Avatar>
  //               <div className="flex-1">
  //                 <CardTitle className="group-hover:text-accent transition-colors">
  //                   {user.username}
  //                 </CardTitle>
  //                 <CardDescription className="flex items-center space-x-1">
  //                   <Mail className="h-3 w-3" />
  //                   <span>{user.email}</span>
  //                 </CardDescription>
  //               </div>
  //             </div>
  //           </CardHeader>
  //           <CardContent>
  //             <div className="space-y-3">
  //               <div className="flex items-center justify-between text-sm">
  //                 <span className="text-muted-foreground">Books Read:</span>
  //                 <Badge variant="secondary">{user.booksRead || 0}</Badge>
  //               </div>
                
  //               {user.favoriteGenre && (
  //                 <div className="flex items-center justify-between text-sm">
  //                   <span className="text-muted-foreground">Favorite Genre:</span>
  //                   <span className="text-accent font-medium">{user.favoriteGenre}</span>
  //                 </div>
  //               )}
                
  //               <div className="flex items-center space-x-1 text-xs text-muted-foreground">
  //                 <Calendar className="h-3 w-3" />
  //                 <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
  //               </div>
                
  //               <div className="flex gap-2 pt-2">
  //                 <Button variant="outline" size="sm" asChild className="flex-1">
  //                   <Link to={`/users/${user.id}`} className="flex items-center space-x-1">
  //                     <Eye className="h-3 w-3" />
  //                     <span>Profile</span>
  //                   </Link>
  //                 </Button>
  //                 <Button
  //                   variant="destructive"
  //                   size="sm"
  //                   onClick={() => handleDeleteUser(user.id)}
  //                 >
  //                   Delete
  //                 </Button>
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>

  //     {filteredUsers.length === 0 && (
  //       <div className="text-center py-16">
  //         <Avatar className="mx-auto h-16 w-16 mb-4">
  //           <AvatarFallback className="bg-muted text-muted-foreground text-xl">
  //             <Plus className="h-8 w-8" />
  //           </AvatarFallback>
  //         </Avatar>
  //         <h3 className="text-lg font-medium mb-2">No users found</h3>
  //         <p className="text-muted-foreground mb-4">
  //           {searchTerm ? "Try adjusting your search terms" : "Start building your reading community"}
  //         </p>
  //         <Button variant="secondary" asChild>
  //           <Link to="/users/add">Add First User</Link>
  //         </Button>
  //       </div>
  //     )}
  //   </div>
  // );
// };

// export default Users;












import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Eye, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'; // ⬅️ Import Axios
import { Edit } from "lucide-react";

const API_BASE_URL = 'http://localhost:8080/api'; // ⬅️ Define your API base URL

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // ⬅️ Replace mock data fetch with a real API call
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userId) => {
    try {
      // ⬅️ Call the DELETE endpoint
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

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

    return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reading Community</h1>
          <p className="text-muted-foreground">Connect with fellow book lovers</p>
        </div>
        <Button variant="secondary" asChild>
          <Link to="/users/add" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="card-elegant group">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {user.username}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Books Read:</span>
                  <Badge variant="secondary">{user.booksRead || 0}</Badge>
                </div>
                
                {user.favoriteGenre && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Favorite Genre:</span>
                    <span className="text-accent font-medium">{user.favoriteGenre}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                   <span>Joined {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild={false} className="flex-1">
                    <Link to={`/users/${user.id}`} className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>Profile</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild={false} className="flex-1">
                    <Link to={`/users/edit/${user.id}`} className="flex items-center space-x-1">
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-16">
          <Avatar className="mx-auto h-16 w-16 mb-4">
            <AvatarFallback className="bg-muted text-muted-foreground text-xl">
              <Plus className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium mb-2">No users found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Start building your reading community"}
          </p>
          <Button variant="secondary" asChild>
            <Link to="/users/add">Add First User</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Users;