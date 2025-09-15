import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// You will need to get the current user ID, likely from authentication state
const CURRENT_USER_ID = 2;

const AddQuote = ({ bookId }) => {
  const [quoteData, setQuoteData] = useState({
    quoteText: "",
    pageNumber: "",
    userId: CURRENT_USER_ID,
    bookId: bookId
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setQuoteData(prevData => ({ ...prevData, [id]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE_URL}/quotes`, quoteData);
//       toast({
//         title: "Success",
//         description: "Quote added successfully!",
//       });
//       // Optionally, refresh the parent component to show the new quote
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add quote. Please try again.",
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
      // ⬅️ Correctly format the payload with nested objects
      const payload = {
        quoteText: quoteData.quoteText,
        pageNumber: quoteData.pageNumber,
        user: { id: CURRENT_USER_ID }, // Pass the user object with its ID
        book: { id: bookId }           // Pass the book object with its ID
      };

      await axios.post(`${API_BASE_URL}/quotes`, payload);
      toast({
        title: "Success",
        description: "Quote added successfully!",
      });
      // Optionally, you can reset the form or refresh the parent component here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle>Add a New Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quoteText">Your Quote</Label>
            <Textarea id="quoteText" value={quoteData.quoteText} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pageNumber">Page Number (optional)</Label>
            <Input id="pageNumber" value={quoteData.pageNumber} onChange={handleInputChange} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddQuote;