import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/blogs/allblogs");
      console.log(response.data);
      setBlogs(response.data.allBlogs);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
  <div className="p-5">
    <h1 className="text-2xl font-bold px-4 border-b-2 border-black mb-5">
      All Blogs
    </h1>

    <div className="flex flex-wrap gap-5">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          blog={blog}
        />
      ))}
    </div>
  </div>
  );
};

export default Home;
