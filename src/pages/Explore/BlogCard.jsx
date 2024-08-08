import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

// Destructure individual props directly in the function parameters
export default function BlogCard({
  id,
  title,
  author,
  description,
  publishedDate,
  image,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={image || "https://via.placeholder.com/345x140"} // Use default image if none provided
        alt={`${title} image`}
        sx={{
          height: "140px", // Fixed height for images
          objectFit: "cover", // Ensure image covers area without stretching
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          by {author} - {publishedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
