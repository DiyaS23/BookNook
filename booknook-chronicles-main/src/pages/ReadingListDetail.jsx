import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Library, Book as BookIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";

const API_BASE_URL = 'http://localhost:8080/api';

const ReadingListDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
     const { user: authUser, isAdmin } = useAuth();
    const [readingList, setReadingList] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/readinglists/${id}`);
                setReadingList(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch reading list data.",
                    variant: "destructive",
                });
                navigate("/reading-lists");
            } finally {
                setLoading(false);
            }
        };
        fetchReadingList();
    }, [id, toast, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!readingList) {
        return (
            <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">Reading list not found</h3>
                <Button asChild>
                    <Link to="/reading-lists">Back to Reading Lists</Link>
                </Button>
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
                    <h1 className="text-3xl font-bold">{readingList.name}</h1>
                    <p className="text-muted-foreground">{readingList.description}</p>
                </div>
            </div>
            
            <Card className="card-elegant">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>List Details</CardTitle>
                        <Badge variant="secondary">{readingList.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Owner:</span>
                            <span className="text-accent">{readingList.user.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span className="text-accent">{new Date(readingList.createdAt).toLocaleDateString()}</span>
                        </div>
                        {/* You would add a list of books here if your backend provided it */}
                    </div>
                </CardContent>
            </Card>

            {(isAdmin || (authUser && readingList.user?.id === authUser.id)) && (
                <Button variant="secondary" asChild>
                    <Link to={`/reading-lists/edit/${readingList.id}`} className="flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit List</span>
                    </Link>
                </Button>
            )}
        </div>
    );
};

export default ReadingListDetail;