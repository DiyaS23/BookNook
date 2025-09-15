// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Search, Star, Eye, BookOpen } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();

//   // Mock data for demonstration
//   const mockBooks = [
//     {
//       id: 1,
//       title: "The Midnight Library",
//       author: "Matt Haig",
//       genre: "Fiction",
//       description: "A novel about life, death, and all the lives in between.",
//       publishedYear: 2020,
//       rating: 4.5
//     },
//     {
//       id: 2,
//       title: "Atomic Habits",
//       author: "James Clear",
//       genre: "Self-Help",
//       description: "An easy & proven way to build good habits & break bad ones.",
//       publishedYear: 2018,
//       rating: 4.8
//     },
//     {
//       id: 3,
//       title: "The Silent Patient",
//       author: "Alex Michaelides",
//       genre: "Thriller",
//       description: "A psychological thriller about a woman who refuses to speak.",
//       publishedYear: 2019,
//       rating: 4.3
//     }
//   ];

//   useEffect(() => {
//     // Simulate API call
//     const fetchBooks = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         setBooks(mockBooks);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch books",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [toast]);

//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.genre.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDeleteBook = async (bookId) => {
//     try {
//       setBooks(books.filter(book => book.id !== bookId));
//       toast({
//         title: "Success",
//         description: "Book deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete book",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Book Library</h1>
//           <p className="text-muted-foreground">Discover and manage your book collection</p>
//         </div>
//         <Button variant="secondary" asChild>
//           <Link to="/books/add" className="flex items-center space-x-2">
//             <Plus className="h-4 w-4" />
//             <span>Add Book</span>
//           </Link>
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//         <Input
//           placeholder="Search books..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       {/* Books Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBooks.map((book) => (
//           <Card key={book.id} className="card-elegant group">
//             <CardHeader>
//               <div className="flex justify-between items-start mb-2">
//                 <Badge variant="secondary">{book.genre}</Badge>
//                 {book.rating && (
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-4 w-4 fill-accent text-accent" />
//                     <span className="text-sm font-medium">{book.rating}</span>
//                   </div>
//                 )}
//               </div>
//               <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
//                 {book.title}
//               </CardTitle>
//               <CardDescription className="text-accent">{book.author}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
//                 {book.description}
//               </p>
//               <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
//                 <span>Published: {book.publishedYear}</span>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" asChild className="flex-1">
//                   <Link to={`/books/${book.id}`} className="flex items-center space-x-1">
//                     <Eye className="h-3 w-3" />
//                     <span>View</span>
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDeleteBook(book.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-16">
//           <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//           <h3 className="text-lg font-medium mb-2">No books found</h3>
//           <p className="text-muted-foreground mb-4">
//             {searchTerm ? "Try adjusting your search terms" : "Start by adding your first book"}
//           </p>
//           <Button variant="secondary" asChild>
//             <Link to="/books/add">Add First Book</Link>
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Books;


















// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Search, Star, Eye, BookOpen } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from 'axios'; // ⬅️ Import Axios

// const API_BASE_URL = 'http://localhost:8080/api'; // ⬅️ Define your API base URL

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();

//   useEffect(() => {
//     // ⬅️ Replace mock data fetch with a real API call
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/books`);
//         setBooks(response.data);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch books",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [toast]);

//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.genre.toLowerCase().includes(searchTerm.toLowerCase())
//     (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleDeleteBook = async (bookId) => {
//     try {
//       // ⬅️ Call the DELETE endpoint
//       await axios.delete(`${API_BASE_URL}/books/${bookId}`);
//       // Optimistically update the UI
//       setBooks(books.filter(book => book.id !== bookId));
//       toast({
//         title: "Success",
//         description: "Book deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete book",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Book Library</h1>
//           <p className="text-muted-foreground">Discover and manage your book collection</p>
//         </div>
//         <Button variant="secondary" asChild>
//           <Link to="/books/add" className="flex items-center space-x-2">
//             <Plus className="h-4 w-4" />
//             <span>Add Book</span>
//           </Link>
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//         <Input
//           placeholder="Search books..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       {/* Books Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBooks.map((book) => (
//           <Card key={book.id} className="card-elegant group">
//             <CardHeader>
//               <div className="flex justify-between items-start mb-2">
//                 <Badge variant="secondary">{book.genre}</Badge>
//                 {book.rating && (
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-4 w-4 fill-accent text-accent" />
//                     <span className="text-sm font-medium">{book.rating}</span>
//                   </div>
//                 )}
//               </div>
//               <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
//                 {book.title}
//               </CardTitle>
//               <CardDescription className="text-accent">{book.author}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
//                 {book.description}
//               </p>
//               <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
//                 <span>Published: {book.publishedYear}</span>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" asChild className="flex-1">
//                   <Link to={`/books/${book.id}`} className="flex items-center space-x-1">
//                     <Eye className="h-3 w-3" />
//                     <span>View</span>
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDeleteBook(book.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-16">
//           <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//           <h3 className="text-lg font-medium mb-2">No books found</h3>
//           <p className="text-muted-foreground mb-4">
//             {searchTerm ? "Try adjusting your search terms" : "Start by adding your first book"}
//           </p>
//           <Button variant="secondary" asChild>
//             <Link to="/books/add">Add First Book</Link>
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Books;














// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Search, Star, Eye, BookOpen } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/books`);
//         setBooks(response.data);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch books",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [toast]);

//   // Use a derived state to filter the books
//   const filteredBooks = books.filter(book => {
//     // Safely access nested properties to prevent the TypeError
//     const titleMatch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
//     const authorMatch = book.author?.toLowerCase().includes(searchTerm.toLowerCase());
//     const genreMatch = book.genre?.toLowerCase().includes(searchTerm.toLowerCase());

//     return titleMatch || authorMatch || genreMatch;
//   });

//   const handleDeleteBook = async (bookId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/books/${bookId}`);
//       setBooks(books.filter(book => book.id !== bookId));
//       toast({
//         title: "Success",
//         description: "Book deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete book",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Book Library</h1>
//           <p className="text-muted-foreground">Discover and manage your book collection</p>
//         </div>
//         <Button variant="secondary" asChild={false}>
//           <Link to="/books/add" className="flex items-center space-x-2">
//             <Plus className="h-4 w-4" />
//             <span>Add Book</span>
//           </Link>
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//         <Input
//           placeholder="Search books..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       {/* Books Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBooks.map((book) => (
//           <Card key={book.id} className="card-elegant group">
//             <CardHeader>
//               <div className="flex justify-between items-start mb-2">
//                 <Badge variant="secondary">{book.genre}</Badge>
//                 {book.rating && (
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-4 w-4 fill-accent text-accent" />
//                     <span className="text-sm font-medium">{book.rating}</span>
//                   </div>
//                 )}
//               </div>
//               <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
//                 {book.title}
//               </CardTitle>
//               <CardDescription className="text-accent">{book.author}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
//                 {book.description}
//               </p>
//               <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
//                 <span>Published: {book.publishedYear}</span>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" asChild={false} className="flex-1">
//                   <Link to={`/books/${book.id}`} className="flex items-center space-x-1">
//                     <Eye className="h-3 w-3" />
//                     <span>View</span>
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDeleteBook(book.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-16">
//           <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//           <h3 className="text-lg font-medium mb-2">No books found</h3>
//           <p className="text-muted-foreground mb-4">
//             {searchTerm ? "Try adjusting your search terms" : "Start by adding your first book"}
//           </p>
//           <Button variant="secondary" asChild={false}>
//             <Link to="/books/add">Add First Book</Link>
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Books;

















import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Star, Eye, BookOpen, Edit } from "lucide-react"; // ⬅️ Add Edit icon
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch books",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [toast]);

  // Use a derived state to filter the books
  const filteredBooks = books.filter(book => {
    // Safely access nested properties to prevent the TypeError
    const titleMatch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const genreMatch = book.genre?.toLowerCase().includes(searchTerm.toLowerCase());

    return titleMatch || authorMatch || genreMatch;
  });

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${bookId}`);
      setBooks(books.filter(book => book.id !== bookId));
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
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
          <h1 className="text-3xl font-bold mb-2">Book Library</h1>
          <p className="text-muted-foreground">Discover and manage your book collection</p>
        </div>
        <Button variant="secondary" asChild={false}>
          <Link to="/books/add" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="card-elegant group">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{book.genre}</Badge>
                {book.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                )}
              </div>
              <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
                {book.title}
              </CardTitle>
              <CardDescription className="text-accent">{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {book.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Published: {book.publicationYear}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild={false} className="flex-1">
                  <Link to={`/books/${book.id}`} className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </Link>
                </Button>
                {/* ⬅️ Added Edit button with dynamic link */}
                <Button variant="outline" size="sm" asChild={false} className="flex-1">
                  <Link to={`/books/edit/${book.id}`} className="flex items-center space-x-1">
                    <Edit className="h-3 w-3" />
                    <span>Edit</span>
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Start by adding your first book"}
          </p>
          <Button variant="secondary" asChild={false}>
            <Link to="/books/add">Add First Book</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Books;