import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "blogs";

export default function useBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blogs from local storage on initial load
    const storedBlogs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      // Load from the default path if not available in local storage
      // This is just a placeholder; you should replace it with actual logic if needed
      setBlogs([]);
    }
    setLoading(false);
  }, []);

  // Add a new blog
  const addBlog = ({ title, author, description, publishedDate, imgUrl }) => {
    const newBlog = {
      id: Date.now(), // Unique ID for each blog
      title,
      author,
      description,
      publishedDate,
      imgUrl,
    };
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBlogs));
  };

  // Delete a blog by its ID
  const delBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBlogs));
  };

  return { blogs, addBlog, delBlog, loading };
}
