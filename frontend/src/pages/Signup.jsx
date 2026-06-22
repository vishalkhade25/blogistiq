import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        "http://localhost:4000/accounts/signup",
        formData
      );
      localStorage.setItem("token",response.data.token)
      alert(response.data.message);
      navigate("/")
    } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    }
  }
};

  return (
    <div className="flex flex-col border-2 border-black p-4 items-center w-max mx-auto my-4">
      <h1 className="text-xl font-bold px-10 py-3">Sign Up</h1>
      <div className="flex flex-col px-5 py-5">
        <label htmlFor="Name" className="my-1">
          Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter Your Name"
          id="Name"
          name="name"
          value={formData.name}
          className="px-2 outline w-60 py-1 rounded"
        />

        <label htmlFor="email" className="my-1">
          Email
        </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter Your email"
          id="email"
          name="email"
          value={formData.email}
          className="px-2 outline w-60 py-1 rounded"
        />

        <label htmlFor="username" className="my-1">
          Username
        </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter Your username"
          id="username"
          name="username"
          value={formData.username}
          className="px-2 outline w-60 py-1 rounded"
        />

        <label htmlFor="password" className="my-1">
          Password
        </label>
        <input
          onChange={handleChange}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter Your password"
          id="password"
          name="password"
          value={formData.password}
          className="px-2 outline w-60 py-1 rounded"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="showPassword"
          id="showPassword"
          checked={isPasswordVisible}
          onChange={() => setIsPasswordVisible(!isPasswordVisible)}
          className="mr-2"
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>

      <button
        className="border-2 border-black w-60 rounded bg-gray-800 text-white py-1 border-orange-300"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
      <Link to="/login" className="text-blue-500 hover:underline">
        Already Have an Account? Login
      </Link>
    </div>
  );
};

export default SignUp;
