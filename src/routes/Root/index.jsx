import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ViewProvider from "./ViewProvider";

export default function RootLayout() {
  return (
    <Container disableGutters sx={{ margin: 0, padding: 0 }}>
      <ViewProvider>
        <Header />
        <Box component="main">
          <Outlet />
        </Box>
      </ViewProvider>
    </Container>
  );
}