import { Button } from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

const Classes = () => {
  const navigate = useNavigate();

  const navToCreation = () => {
    navigate("create");
  };
  return (
    <MainLayout
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Classes</span>
          <Button
            variant="contained"
            onClick={navToCreation}
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
          >
            Add Class
          </Button>
        </div>
      }
    >
      <div
        style={{
          backgroundColor: "white",
          height: "636px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.2)",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <span
            style={{
              color: "#333",
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 800,
            }}
          >
            There are no existing classes yet.
          </span>
          <Button
            onClick={navToCreation}
            variant="contained"
            style={{ textTransform: "none" }}
            startIcon={<AddIcon />}
          >
            Add Class
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Classes;
