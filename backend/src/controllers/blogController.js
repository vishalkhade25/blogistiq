import blogModel from "../models/blogModel.js";

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newBlog = new blogModel({
      title,
      content,
      author: req.user.userId,
    });
    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find({}).populate("author","name username").sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, message: "Blogs fetched successfully", allBlogs });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await blogModel.findById(id).populate("author","name username");
    if (!singleBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Blog Fetched successfully",
      singleBlog,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const myBlogs = await blogModel.find({
      author: req.user.userId,
    }).populate("author","name username");
    return res.status(200).json({
      success: true,
      myBlogs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    if (blog.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to change the blog" });
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    if (blog.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this blog"});
    }

    await blog.deleteOne();
    return res
      .status(200)
      .json({ message: "Blog deleted successfully"});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export { createBlog, getAllBlogs, getSingleBlog, getMyBlogs, updateBlog, deleteBlog };
