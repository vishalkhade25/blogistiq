import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MyBlogCard from "../components/MyBlogCard";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const getMyBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/blogs/myBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.myBlogs);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/blogs/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleEdit = (id)=>{
    navigate(`/edit-blog/${id}`);
  }

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold px-4 border-b-2 border-black mb-5">My Blogs</h1>
      <div className="flex flex-wrap gap-5">
        {blogs.map((blog) => {
          return (
            <MyBlogCard key={blog._id} blog={blog} onDelete={handleDelete} onEdit={handleEdit} />
          );
        })}
      </div>
    </div>
  );
};

export default MyBlogs;
