// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Plus, Search, Library, Book as BookIcon, Eye } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const ReadingLists = () => {
//   const [readingLists, setReadingLists] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState("all");
//   const { toast } = useToast();

//   // Mock data
//   const mockUsers = [
//     { id: 1, username: "bookworm_sarah" },
//     { id: 2, username: "reading_enthusiast" },
//     { id: 3, username: "novel_hunter" }
//   ];

//   const mockReadingLists = [
//     {
//       id: 1,
//       name: "Summer Reading 2024",
//       description: "Books I want to read during summer vacation",
//       userId: 1,
//       username: "bookworm_sarah",
//       bookCount: 8,
//       createdAt: "2024-01-15",
//       isPublic: true
//     },
//     {
//       id: 2,
//       name: "Sci-Fi Favorites",
//       description: "My collection of favorite science fiction novels",
//       userId: 2,
//       username: "reading_enthusiast",
//       bookCount: 12,
//       createdAt: "2024-01-10",
//       isPublic: true
//     },
//     {
//       id: 3,
//       name: "Mystery & Thriller Collection",
//       description: "Page-turners that kept me up all night",
//       userId: 3,
//       username: "novel_hunter",
//       bookCount: 6,
//       createdAt: "2024-01-05",
//       isPublic: false
//     }
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         setReadingLists(mockReadingLists);
//         setUsers(mockUsers);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch reading lists",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [toast]);

//   const filteredLists = readingLists.filter(list => {
//     const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          list.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          list.username.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesUser = selectedUser === "all" || list.userId.toString() === selectedUser;
    
//     return matchesSearch && matchesUser;
//   });

//   const handleDeleteList = async (listId) => {
//     try {
//       setReadingLists(readingLists.filter(list => list.id !== listId));
//       toast({
//         title: "Success",
//         description: "Reading list deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete reading list",
//         variant: "destructive",
//       });
//     }
//   };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-64">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="space-y-8">
  //     {/* Header */}
  //     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  //       <div>
  //         <h1 className="text-3xl font-bold mb-2">Reading Lists</h1>
  //         <p className="text-muted-foreground">Discover curated book collections</p>
  //       </div>
  //       <Button variant="secondary" asChild>
  //         <Link to="/reading-lists/add" className="flex items-center space-x-2">
  //           <Plus className="h-4 w-4" />
  //           <span>Create List</span>
  //         </Link>
  //       </Button>
  //     </div>

  //     {/* Filters */}
  //     <div className="flex flex-col sm:flex-row gap-4">
  //       <div className="relative flex-1 max-w-md">
  //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
  //         <Input
  //           placeholder="Search reading lists..."
  //           value={searchTerm}
  //           onChange={(e) => setSearchTerm(e.target.value)}
  //           className="pl-10"
  //         />
  //       </div>
        
  //       <Select value={selectedUser} onValueChange={setSelectedUser}>
  //         <SelectTrigger className="w-full sm:w-48">
  //           <SelectValue placeholder="Filter by user" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectItem value="all">All Users</SelectItem>
  //           {users.map((user) => (
  //             <SelectItem key={user.id} value={user.id.toString()}>
  //               {user.username}
  //             </SelectItem>
  //           ))}
  //         </SelectContent>
  //       </Select>
  //     </div>

  //     {/* Reading Lists Grid */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {filteredLists.map((list) => (
  //         <Card key={list.id} className="card-elegant group">
  //           <CardHeader>
  //             <div className="flex justify-between items-start mb-2">
  //               <Badge variant={list.isPublic ? "secondary" : "outline"}>
  //                 {list.isPublic ? "Public" : "Private"}
  //               </Badge>
  //               <div className="flex items-center space-x-1 text-sm text-muted-foreground">
  //                 <BookIcon className="h-4 w-4" />
  //                 <span>{list.bookCount}</span>
  //               </div>
  //             </div>
  //             <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
  //               {list.name}
  //             </CardTitle>
  //             <CardDescription className="text-accent">by {list.username}</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
  //               {list.description}
  //             </p>
  //             <div className="text-xs text-muted-foreground mb-4">
  //               Created: {new Date(list.createdAt).toLocaleDateString()}
  //             </div>
  //             <div className="flex gap-2">
  //               <Button variant="outline" size="sm" asChild className="flex-1">
  //                 <Link to={`/reading-lists/${list.id}`} className="flex items-center space-x-1">
  //                   <Eye className="h-3 w-3" />
  //                   <span>View</span>
  //                 </Link>
  //               </Button>
  //               <Button
  //                 variant="destructive"
  //                 size="sm"
  //                 onClick={() => handleDeleteList(list.id)}
  //               >
  //                 Delete
  //               </Button>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>

  //     {filteredLists.length === 0 && (
  //       <div className="text-center py-16">
  //         <Library className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
  //         <h3 className="text-lg font-medium mb-2">No reading lists found</h3>
  //         <p className="text-muted-foreground mb-4">
  //           {searchTerm || selectedUser !== "all" 
  //             ? "Try adjusting your search criteria" 
  //             : "Start by creating your first reading list"}
  //         </p>
  //         <Button variant="secondary" asChild>
  //           <Link to="/reading-lists/add">Create First List</Link>
  //         </Button>
  //       </div>
  //     )}
  //   </div>
  // );
// };

// export default ReadingLists;

















import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Library, Book as BookIcon, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'; // ⬅️ Import Axios

const API_BASE_URL = 'http://localhost:8080/api'; // ⬅️ Define your API base URL

const ReadingLists = () => {
  const [readingLists, setReadingLists] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // ⬅️ Replace mock data fetch with real API calls
    const fetchData = async () => {
      try {
        // Fetch all users for the filter dropdown
        const usersResponse = await axios.get(`${API_BASE_URL}/users`);
        setUsers(usersResponse.data);

        // Fetch all reading lists. Note: Your endpoint POST /api/readinglists/user is not suitable for fetching ALL lists.
        // It's likely intended for a specific user. For a generic "all lists" page, you'll need a new endpoint like GET /api/readinglists.
        // I will assume you have a GET endpoint for all lists for this component to work correctly.
        // If not, you will need to create one.
        const listsResponse = await axios.get(`${API_BASE_URL}/readinglists`); // ⬅️ Assuming this endpoint exists
        setReadingLists(listsResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const filteredLists = readingLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (list.username && list.username.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // I've also updated this filter to match the new `users` state
    const matchesUser = selectedUser === "all" || (list.userId && list.userId.toString() === selectedUser);
    
    return matchesSearch && matchesUser;
  });

  const handleDeleteList = async (listId) => {
    try {
      // ⬅️ Call the DELETE endpoint
      await axios.delete(`${API_BASE_URL}/readinglists/${listId}`);
      setReadingLists(readingLists.filter(list => list.id !== listId));
      toast({
        title: "Success",
        description: "Reading list deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete reading list",
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold mb-2">Reading Lists</h1>
          <p className="text-muted-foreground">Discover curated book collections</p>
        </div>
        <Button variant="secondary" asChild>
          <Link to="/reading-lists/add" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create List</span>
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reading lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reading Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => (
          <Card key={list.id} className="card-elegant group">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={list.isPublic ? "secondary" : "outline"}>
                  {list.isPublic ? "Public" : "Private"}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <BookIcon className="h-4 w-4" />
                  <span>{list.bookCount}</span>
                </div>
              </div>
              <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
                {list.name}
              </CardTitle>
              <CardDescription className="text-accent">by {list.user?.username} </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {list.description}
              </p>
              <div className="text-xs text-muted-foreground mb-4">
                Created: {new Date(list.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to={`/reading-lists/${list.id}`} className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteList(list.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLists.length === 0 && (
        <div className="text-center py-16">
          <Library className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No reading lists found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedUser !== "all" 
              ? "Try adjusting your search criteria" 
              : "Start by creating your first reading list"}
          </p>
          <Button variant="secondary" asChild>
            <Link to="/reading-lists/add">Create First List</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadingLists;