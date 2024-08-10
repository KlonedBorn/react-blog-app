import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "blogs1";

export default function useBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch blogs from the JSON file
  const fetchBlogsFromFile = async () => {
    try {
      const response = await fetch("/data/blogs.json"); // Ensure the path is correct
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch blogs from file:", error);
      return [];
    }
  };

  // Load blogs from local storage or JSON file on mount
  useEffect(() => {
    const loadBlogs = async () => {
      const storedBlogs = localStorage.getItem(LOCAL_STORAGE_KEY);
      const initialBlogs = await fetchBlogsFromFile();
      setBlogs(initialBlogs);
      setLoading(false); // Set loading to false after data is loaded
    };

    loadBlogs();
  }, []);

  // Save blogs to local storage on unmount
  useEffect(() => {
    return () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
    };
  }, [blogs]);

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
  };

  // Delete a blog by its ID
  const delBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  return { blogs, addBlog, delBlog, loading };
}
