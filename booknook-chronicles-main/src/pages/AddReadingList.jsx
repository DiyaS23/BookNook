import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
// NOTE: You'll need to replace this with the actual authenticated user's ID
const CURRENT_USER_ID = 2;

const AddReadingList = () => {
  const [listData, setListData] = useState({
    name: "",
    description: "",
    status: "Planning",
    userId: CURRENT_USER_ID
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setListData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create the payload with the correct structure
      const payload = {
        name: listData.name,
        description: listData.description,
        status: listData.status,
        user: { id: listData.userId }
      };
      
      await axios.post(`${API_BASE_URL}/readinglists`, payload);
      toast({
        title: "Success",
        description: "Reading list created successfully!",
      });
      navigate("/reading-lists");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create reading list. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create a Reading List</h1>
          <p className="text-muted-foreground">Organize your books into a new list.</p>
        </div>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>List Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input id="name" value={listData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={listData.description} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={listData.status} onChange={handleInputChange} disabled />
              <p className="text-xs text-muted-foreground">
                (Default status is 'Planning' for a new list)
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create List"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddReadingList;