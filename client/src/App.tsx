import "./App.css";
import { AppBar, Button, Toolbar, Box, Tabs, Tab } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import Logo from "./assets/Nav/Logo.png";

function App() {
  const navigate = useNavigate();

  const NAV_TABS = [
    { label: "Classes", path: "/classes" },
    { label: "Teachers", path: "/teachers" },
  ];

  const currentIndex = Math.max(
    0,
    NAV_TABS.findIndex((t) => location.pathname.startsWith(t.path)),
  );

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    navigate(NAV_TABS[newIndex].path);
  };
  return (
    <div className="app-main">
      <AppBar position="static" elevation={0} className="topbar-appbar">
        <Toolbar disableGutters className="topbar-toolbar">
          <Box className="topbar-brand">
            <img src={Logo} alt="Unifinity" />
            {/* Tabs on the right */}
            <Tabs
              value={currentIndex}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                marginTop: "40px",
                "& .MuiTab-root": {
                  minHeight: "auto", // remove extra height on Tab
                  py: 0, // no vertical padding
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "20px", // visually match title; tweak as you like
                },
              }}
            >
              {NAV_TABS.map((t) => (
                <Tab key={t.path} label={t.label} />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
