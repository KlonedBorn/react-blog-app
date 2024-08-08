import React, { useState, useEffect } from "react";
import {
  Container,
  Select,
  TextField,
  Toolbar,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper,
} from "@mui/material";
import useBlogData from "./useBlogData";
import BlogCardGrid from "./BlogCardGrid";

const SearchByTitle = ({ searchTerm, setSearchTerm }) => (
  <TextField
    label="Search by Title"
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    fullWidth
    sx={{ marginRight: 2 }}
  />
);

const CardSorter = ({ sortOrder, setSortOrder }) => (
  <FormControl variant="outlined" sx={{ minWidth: 140 }}>
    <InputLabel>Sort By Date</InputLabel>
    <Select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      label="Sort By Date"
    >
      <MenuItem value="asc">Ascending</MenuItem>
      <MenuItem value="desc">Descending</MenuItem>
    </Select>
  </FormControl>
);

export default function ExplorePage() {
  const { blogs, loading } = useBlogData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const filtered = blogs
      .filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.publishedDate) - new Date(b.publishedDate)
          : new Date(b.publishedDate) - new Date(a.publishedDate)
      );
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, sortOrder]);

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Paper elevation={8} sx={{ p: 4 }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <SearchByTitle
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <CardSorter sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </Toolbar>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <BlogCardGrid blogs={filteredBlogs} />
        </Box>
      </Paper>
    </Container>
  );
}