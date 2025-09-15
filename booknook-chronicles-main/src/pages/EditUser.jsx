// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// const EditUser = () => {
//   const { id } = useParams();
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "", // Note: For a real app, do not retrieve password
//     firstName: "",
//     lastName: "",
//     profilePictureUrl: "",
//     bio: ""
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/users/${id}`);
//         setUserData(response.data);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch user data.",
//           variant: "destructive",
//         });
//         navigate("/users");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id, toast, navigate]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setUserData(prevData => ({ ...prevData, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axios.put(`${API_BASE_URL}/users/${id}`, userData);
//       toast({
//         title: "Success",
//         description: "User updated successfully!",
//       });
//       navigate(`/users`);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update user. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setSubmitting(false);
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
//       <div className="flex items-center space-x-4">
//         <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold">Edit User</h1>
//           <p className="text-muted-foreground">Update the details for {userData.username}.</p>
//         </div>
//       </div>

//       <Card className="max-w-xl mx-auto">
//         <CardHeader>
//           <CardTitle>User Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input id="username" value={userData.username} onChange={handleInputChange} required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" value={userData.email} onChange={handleInputChange} required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="firstName">First Name</Label>
//               <Input id="firstName" value={userData.firstName} onChange={handleInputChange} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input id="lastName" value={userData.lastName} onChange={handleInputChange} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
//               <Input id="profilePictureUrl" value={userData.profilePictureUrl} onChange={handleInputChange} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="bio">Bio</Label>
//               <Input id="bio" value={userData.bio} onChange={handleInputChange} />
//             </div>
//             <Button type="submit" className="w-full" disabled={submitting}>
//               {submitting ? "Updating..." : "Update User"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EditUser;











import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    bio: "",
    booksRead: 0,
    favoriteGenre: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        // ⬅️ Ensure all string values are converted from null to empty string
        const user = response.data;
        const sanitizedUserData = {
          ...user,
          username: user.username || "",
          email: user.email || "",
          password: user.password || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          profilePictureUrl: user.profilePictureUrl || "",
          bio: user.bio || "",
          favoriteGenre: user.favoriteGenre || ""
        };
        setUserData(sanitizedUserData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data.",
          variant: "destructive",
        });
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, toast, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = id === 'booksRead' ? parseInt(value) || 0 : value;
    setUserData(prevData => ({ ...prevData, [id]: updatedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`${API_BASE_URL}/users/${id}`, userData);
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
      navigate(`/users`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit User</h1>
          <p className="text-muted-foreground">Update the details for {userData.username}.</p>
        </div>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={userData.username} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={userData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={userData.firstName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={userData.lastName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
              <Input id="profilePictureUrl" value={userData.profilePictureUrl} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" value={userData.bio} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booksRead">Books Read</Label>
              <Input id="booksRead" type="number" value={userData.booksRead} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favoriteGenre">Favorite Genre</Label>
              <Input id="favoriteGenre" value={userData.favoriteGenre} onChange={handleInputChange} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Updating..." : "Update User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;