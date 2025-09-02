import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router/dom";
import { router } from "./route/Router.tsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#135BB4",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
