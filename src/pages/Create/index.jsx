import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone"; // Import react-dropzone for file upload
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useBlog from "../../hooks/useBlogs";

export default function CreatePage() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imgUrl: "",
    publishedDate: today,
    imgFile: null,
  });

  const [uploading, setUploading] = useState(false);

  const { addBlog } = useBlog(); // Get the addBlog function from the useBlog hook

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image URL submission
  const handleUrlChange = (event) => {
    setFormData({ ...formData, imgUrl: event.target.value, imgFile: null });
  };

  // Handle file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFormData({
        ...formData,
        imgUrl: URL.createObjectURL(file), // Create a temporary URL for the file
        imgFile: file,
      });
    },
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setUploading(true);

    // Add the blog using the useBlog hook
    addBlog({
      title: formData.title,
      author: formData.author,
      description: formData.description,
      publishedDate: new Date().toISOString(), // Use current date as publishedDate
      imgUrl: formData.imgUrl,
    });

    // Reset form and stop uploading
    setFormData({
      title: "",
      author: "",
      description: "",
      imgUrl: "",
      imgFile: null,
    });
    setUploading(false);
  };

  return (
    <Box
      component={Paper}
      sx={{
        padding: 3,
        maxWidth: 600,
        margin: "auto",
        mt: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create New Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Image URL"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleUrlChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <UploadFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed",
            borderColor: "text.primary",
            borderRadius: 1,
            padding: 2,
            textAlign: "center",
            cursor: "pointer",
            marginTop: 2,
            minHeight: 100,
          }}
        >
          <input {...getInputProps()} />
          {formData.imgFile ? (
            <Box
              component="img"
              src={formData.imgUrl}
              alt="Uploaded preview"
              sx={{ maxWidth: "100%", maxHeight: 100, marginTop: 1 }}
            />
          ) : (
            <Typography variant="body1">
              Drag & drop an image here or click to select
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={uploading}
        >
          {uploading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
}
