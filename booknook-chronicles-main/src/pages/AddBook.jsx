import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";

const API_BASE_URL = 'http://localhost:8080/api';

const AddBook = () => {
  const { authAxios, isAdmin, user } = useAuth();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    publisher: "",
    publicationYear: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
         toast({ title: "Error", description: "Only administrators can add books.", variant: "destructive" });
         setLoading(false);
         return;
    }
    setLoading(true);
    try {
     await authAxios.post(`${API_BASE_URL}/books`, bookData); 
      toast({
        title: "Success",
        description: "Book added successfully!",
      });
      navigate("/books");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
if (!user || !isAdmin) {
      return (
          <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">Access Denied</h3>
              <p className="text-muted-foreground">You must be an administrator to add new books.</p>
          </div>
      );
  }
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add a New Book</h1>
          <p className="text-muted-foreground">Fill out the details to add a new book to the library.</p>
        </div>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={bookData.title} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={bookData.author} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" value={bookData.genre} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={bookData.description} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" value={bookData.isbn} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" value={bookData.publisher} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input id="publicationYear" type="number" value={bookData.publicationYear} onChange={handleInputChange} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBook;