import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/accounts/login/",
        formData
      );
      // console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col border-2 border-black p-4 items-center w-max mx-auto my-4">
      <h1 className="text-xl font-bold px-10 py-3">Login Page</h1>
      <div className="flex flex-col px-5 py-5">
        <label htmlFor="email" className="my-1">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-2 outline w-60 py-1 rounded"
        />
        <label htmlFor="username" className="my-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="px-2 outline w-60 py-1 rounded"
        />
        <label htmlFor="password" className="my-1">
          Password
        </label>
        <input
          type="text"
          placeholder="Enter your password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-2 outline w-60 py-1 rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="border-2 border-black w-60 rounded bg-gray-800 text-white py-1 hover:border-orange-300"
      >
        Sign Up
      </button>
      <Link to="/signup" className="text-blue-500 hover:underline">
        New user ?
      </Link>
    </div>
  );
};

export default Login;
