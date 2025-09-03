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
import "./style/Classes.css";

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
        <div className="classes-titlebar">
          <span>{constant.title_classes}</span>
          <Button
            variant="contained"
            onClick={navToCreation}
            startIcon={<AddIcon />}
            className="classes-add-btn"
          >
            {constant.button_add_class}
          </Button>
        </div>
      }
    >
      <div className="classes-card">
        {classList.length === 0 ? (
          <div className="classes-empty-wrap">
            <div className="classes-empty-box">
              <span className="classes-empty-text">{constant.class_empty}</span>
              <Button
                onClick={navToCreation}
                variant="contained"
                className="classes-add-btn"
                startIcon={<AddIcon />}
              >
                {constant.button_add_class}
              </Button>
            </div>
          </div>
        ) : (
          <div className="classes-table">
            <Table>
              <TableHead>
                <TableRow className="classes-table-head-row">
                  {constant.class_header.map((i) => (
                    <TableCell key={i} className="classes-table-head-cell">
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
