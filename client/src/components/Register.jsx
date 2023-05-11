import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(true);
  // const {  setUserName, username } = useContext(AuthContext);
  const [username,setUserName] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}auth/register`, {
        username,
        email,
        password,
      });
      console.log(res.data)
      // setIsLoggedIn(true);
      localStorage.setItem("token", res.data);
      window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-6 py-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-4xl text-center font-medium mb-6">Sign up</h2>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full py-2 px-4 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-4 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-secondary rounded-md  focus:outline-none  transition-all duration-300"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;