import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";

const API_BASE_URL = 'http://localhost:8080/api';

const EditBook = () => {
  const { id } = useParams();
  const { authAxios, isAdmin } = useAuth();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    publisher: "",
    publicationYear: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books/${id}`);
        setBookData(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch book data.",
          variant: "destructive",
        });
        navigate("/books");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, toast, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
        toast({ title: "Error", description: "Only administrators can edit books.", variant: "destructive" });
        setSubmitting(false);
        return;
    }
    setSubmitting(true);
    try {
      await authAxios.put(`${API_BASE_URL}/books/${id}`, bookData);
      toast({
        title: "Success",
        description: "Book updated successfully!",
      });
      navigate(`/books/${id}`);
    } catch (error) {
      const errorMsg = error.response?.status === 403 ? "Access Denied: You must be an administrator." : "Failed to update book. Please try again.";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
if (!loading && !isAdmin) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium mb-2">Access Denied</h3>
        <p className="text-muted-foreground">You must be an administrator to edit books.</p>
        <Button asChild><Link to="/books">Back to Books</Link></Button>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
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
          <h1 className="text-3xl font-bold">Edit Book</h1>
          <p className="text-muted-foreground">Update the details for "{bookData.title}".</p>
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Updating..." : "Update Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBook;