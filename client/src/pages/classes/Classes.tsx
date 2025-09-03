import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import constant from "../../constant/constant.json";

const Classes: React.FC = () => {
  const navigate = useNavigate();

  const [classList, setClassList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navToCreation = () => {
    navigate("create");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/classes");
        setClassList(res.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <>Loading...</>;

  return (
    <MainLayout
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{constant.title_classes}</span>
          <Button
            variant="contained"
            onClick={navToCreation}
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
          >
            {constant.button_add_class}
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
        {classList.length === 0 ? (
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
              {constant.class_empty}
            </span>
            <Button
              onClick={navToCreation}
              variant="contained"
              style={{ textTransform: "none" }}
              startIcon={<AddIcon />}
            >
              {constant.button_add_class}
            </Button>
          </div>
        ) : (
          <div style={{ color: "black", padding: "32px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#e2e2e2" }}>
                  {constant.class_header.map((i) => (
                    <TableCell key={i} style={{ fontWeight: 800 }}>
                      {i}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {classList.map((i: any, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{i.level.label}</TableCell>
                    <TableCell>Class {i.name}</TableCell>
                    <TableCell>{i.formTeacher.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Classes;
