import React from "react";
import { Grid } from "@mui/material";
import BlogCard from "./BlogCard";

export default function BlogCardGrid({ blogs = [] }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        overflowY: "auto", // Enable vertical scrolling if needed
      }}
    >
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
          <BlogCard
            id={blog.id}
            title={blog.title}
            author={blog.author}
            description={blog.description}
            publishedDate={blog.publishedDate}
            image={blog.image} // Ensure each blog object contains an image URL
          />
        </Grid>
      ))}
    </Grid>
  );
}
