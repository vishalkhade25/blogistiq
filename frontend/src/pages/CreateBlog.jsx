import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { token } = useContext(AuthContext);

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
        "http://localhost:4000/blogs/newblog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(response.data.message);
      navigate("/myblogs");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="m-2 p-4 flex flex-col">
      <h1 className="text-2xl font-bold px-4 border-b-2 border-black">
        Create Your Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 my-4 mx-2 gap-2"
      >
        <label htmlFor="title" className="font-bold">
          Title{" "}
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="title"
          name="title"
          onChange={handleChange}
          className="px-2 outline py-1 rounded w-1/2"
        />
        <label htmlFor="content" className="font-bold">
          Content{" "}
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter content"
          onChange={handleChange}
          className="px-2 outline w-1/2 py-1 rounded h-48"
        ></textarea>

        <button type="submit" className="border-2 border-black w-36 rounded bg-gray-800 text-white py-1 hover:border-orange-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
