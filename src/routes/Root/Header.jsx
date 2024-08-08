import {
  AppBar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import logoPath from "../../assets/react.svg";

const AppLogo = () => (
  <Box
    component="img"
    src={logoPath}
    alt="React Logo"
    sx={{ height: "2.5rem", verticalAlign: "middle" }} // Set a consistent logo height
  />
);

export default function Header({ view, onViewChange = () => {} }) {
  // Handler to change the view
  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      onViewChange(newView); // Pass the new view to the callback
    }
  };

  return (
    <AppBar
      sx={{
        padding: "0.5rem",
        backgroundColor: (theme) => theme.palette.primary.main,
        flexGrow: 1,
      }}
    >
      <Toolbar>
        <AppLogo />
        <Typography
          variant="h6"
          component="div"
          sx={{
            ml: 1,
            mr: "auto",
            fontWeight: "bold",
            color: "white", // Ensure text color matches the theme
          }}
        >
          React Blog App
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={view} // Reflect the current view
          onChange={handleViewChange}
          sx={{
            "& .MuiToggleButton-root": {
              gap: 2,
              color: "white", // Ensure button text color is white
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderColor: (theme) => theme.palette.secondary.main,
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              },
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.dark, // Darker shade on hover
              },
            },
          }}
        >
          <ToggleButton key="create" value="create">
            Create
          </ToggleButton>
          <ToggleButton key="explore" value="explore">
            Explore
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
