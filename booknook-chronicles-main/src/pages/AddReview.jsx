import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// You will need to get the current user ID, likely from authentication state
const CURRENT_USER_ID = 2;

const AddReview = ({ bookId }) => {
  const [reviewData, setReviewData] = useState({
    reviewText: "",
    rating: 0,
    userId: CURRENT_USER_ID,
    bookId: bookId
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRatingChange = (newRating) => {
    setReviewData(prevData => ({ ...prevData, rating: newRating }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReviewData(prevData => ({ ...prevData, [id]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE_URL}/reviews`, reviewData);
//       toast({
//         title: "Success",
//         description: "Review added successfully!",
//       });
//       // Optionally, refresh the parent component to show the new review
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add review. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ⬅️ Instead of bookId, pass a Book object with the correct ID
      const payload = {
        reviewText: reviewData.reviewText,
        rating: reviewData.rating,
        user: { id: reviewData.userId }, // ⬅️ Pass the user object with ID
        book: { id: reviewData.bookId } // ⬅️ Pass the book object with ID
      };
      
      await axios.post(`${API_BASE_URL}/reviews`, payload);
      toast({
        title: "Success",
        description: "Review added successfully!",
      });
      // Refresh the page or update state to show the new review
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < reviewData.rating ? 'fill-accent text-accent' : 'text-muted-foreground'
        }`}
        onClick={() => handleRatingChange(i + 1)}
      />
    ));
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle>Add a New Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex space-x-1">{renderStars()}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reviewText">Your Review</Label>
            <Textarea id="reviewText" value={reviewData.reviewText} onChange={handleInputChange} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReview;