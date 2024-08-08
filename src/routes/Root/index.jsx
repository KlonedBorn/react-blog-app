import Header from "./Header";
import { Box, Container } from "@mui/material";
import ViewProvider from "./ViewProvider";
import useView from "./useView";
import CreatePage from "../../pages/Create";
import ExplorePage from "../../pages/Explore";

export default function RootLayout() {
  const [view, setView] = useView();

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <ViewProvider>
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden", // Prevent overflow
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              overflow: "auto", // Allow scrolling if content overflows
              padding: 2,
              mt: 6,
            }}
          >
            {view === "create" && <CreatePage />}
            {view === "explore" && <ExplorePage />}
          </Box>
        </Box>
      </ViewProvider>
    </Container>
  );
}
