// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// const AddUser = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     profilePictureUrl: "",
//     bio: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setUserData(prevData => ({ ...prevData, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE_URL}/users`, userData);
//       toast({
//         title: "Success",
//         description: "User added successfully!",
//       });
//       navigate("/users");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add user. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center space-x-4">
//         <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold">Add a New User</h1>
//           <p className="text-muted-foreground">Create a new user profile for the community.</p>
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
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" type="password" value={userData.password} onChange={handleInputChange} required />
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
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Adding..." : "Add User"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddUser;








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    bio: "",
    booksRead: 0, // ⬅️ Added new field
    favoriteGenre: "" // ⬅️ Added new field
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Handle number input for booksRead
    const updatedValue = id === 'booksRead' ? parseInt(value) || 0 : value;
    setUserData(prevData => ({ ...prevData, [id]: updatedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/users`, userData);
      toast({
        title: "Success",
        description: "User added successfully!",
      });
      navigate("/users");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
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
          <h1 className="text-3xl font-bold">Add a New User</h1>
          <p className="text-muted-foreground">Create a new user profile for the community.</p>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={userData.password} onChange={handleInputChange} required />
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;