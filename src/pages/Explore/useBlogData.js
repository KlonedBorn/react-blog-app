import { useState, useEffect } from "react";
import blogsPath from "./blogs.json";

const LOCAL_STORAGE_KEY = "blogs";

const initializeStorage = () => {
  // Check if localStorage already contains blog data
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    // If not, load from the JSON file and save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogsPath));
  }
};

export default function useBlogData() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize storage on component mount
    initializeStorage();

    // Fetch blogs from localStorage
    const storedBlogs = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }

    // Set loading to false once the data is loaded
    setLoading(false);
  }, []);

  return { blogs, loading };
}
