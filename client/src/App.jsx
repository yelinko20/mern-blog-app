import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import EditPost from "./components/EditPost";
import PostForm from "./components/PostForm";
import SinglePost from "./components/SinglePost";
export default function App() {
  return (
    <div className="bg-gray-100 font-LexendDeca min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/:id" element={<SinglePost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="upload" element={<PostForm />} />
        </Routes>
      </Router>
    </div>
  );
}
