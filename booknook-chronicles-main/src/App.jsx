import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Users from "./pages/Users";
import ReadingLists from "./pages/ReadingLists";
import NotFound from "./pages/NotFound";
import EditBook from "./pages/EditBook";
import AddBook from "./pages/AddBook"; 
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserDetail from "./pages/UserDetail";
import AddReadingList from "./pages/AddReadingList"; 
import ReadingListDetail from "./pages/ReadingListDetail";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "@/context/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/add" element={<AddBook />} /> 
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<AddUser />} /> 
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/reading-lists" element={<ReadingLists />} />
            <Route path="/reading-lists/add" element={<AddReadingList />} /> 
            <Route path="/reading-lists/:id" element={<ReadingListDetail />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
