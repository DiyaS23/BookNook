import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Quote, MessageSquare, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";
import AddReview from './AddReview';
import AddQuote from './AddQuote';

const API_BASE_URL = 'http://localhost:8080/api';

const BookDetail = () => {
  const { authAxios, user } = useAuth();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showAddQuote, setShowAddQuote] = useState(false);
  const { toast } = useToast();

  const fetchBookData = async () => {
    try {
      const bookResponse = await axios.get(`${API_BASE_URL}/books/${id}`);
      setBook(bookResponse.data);
      const reviewsResponse = await axios.get(`${API_BASE_URL}/reviews/book/${id}`);
      setReviews(reviewsResponse.data);
      const quotesResponse = await axios.get(`${API_BASE_URL}/quotes/book/${id}`);
      setQuotes(quotesResponse.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch book data",
        variant: "destructive",
      });
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, [id, toast]);

  const handleDeleteReview = async (reviewId) => {
    if (!user) return; 
    try {
      await authAxios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review.id !== reviewId));
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    if (!user) return;
    try {
      await authAxios.delete(`${API_BASE_URL}/quotes/${quoteId}`);
      setQuotes(quotes.filter(quote => quote.id !== quoteId));
      toast({
        title: "Success",
        description: "Quote deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-accent text-accent' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium mb-2">Book not found</h3>
        <Button asChild>
          <Link to="/books">Back to Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/books">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-accent text-lg">{book.author}</p>
        </div>
      </div>

      {/* Book Details */}
      <Card className="card-elegant">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{book.genre}</Badge>
                <span className="text-sm text-muted-foreground">Published: {book.publicationYear}</span>
                {book.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{book.rating}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{book.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reviews Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Reviews ({reviews.length})</span>
            </h2>
            <Button variant="outline" size="sm" onClick={() => setShowAddReview(!showAddReview)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Review
            </Button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="card-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{review.username}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.reviewText}</p>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                <p>No reviews yet. Be the first to review this book!</p>
              </div>
            )}
          </div>
          {/* ⬅️ Add the AddReview component here, with a conditional render */}
          {showAddReview && (
            <div className="pt-8">
              <AddReview bookId={book.id} />
            </div>
          )}
        </div>

        {/* Quotes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <Quote className="h-5 w-5" />
              <span>Quotes ({quotes.length})</span>
            </h2>
            <Button variant="outline" size="sm" onClick={() => setShowAddQuote(!showAddQuote)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Quote
            </Button>
          </div>

          <div className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id} className="card-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{quote.username}</CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteQuote(quote.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <CardDescription className="flex items-center space-x-4">
                    {quote.createdAt && <span>{new Date(quote.createdAt).toLocaleDateString()}</span>}
                    {quote.pageNumber && <span>Page {quote.pageNumber}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic border-l-4 border-accent pl-4">
                    "{quote.quoteText}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}

            {quotes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Quote className="mx-auto h-8 w-8 mb-2" />
                <p>No quotes yet. Share your favorite quotes from this book!</p>
              </div>
            )}
          </div>
          {/* ⬅️ Add the AddQuote component here, with a conditional render */}
          {showAddQuote && (
            <div className="pt-8">
              <AddQuote bookId={book.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;