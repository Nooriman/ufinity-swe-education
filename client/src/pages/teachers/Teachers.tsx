import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MainLayout from "../../layout/MainLayout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../utilities/axiosInstance";
import constant from "../../constant/constant.json";
import "./style/Teachers.css";

const Teachers: React.FC = () => {
  const navigate = useNavigate();

  const [teacherList, setTeacherList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navToCreation = () => {
    navigate("create");
  };

  const splitContact = (contact: string) => {
    return contact.slice(0, 4) + " " + contact.slice(4, 8);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/teachers");
        setTeacherList(res.data);
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
        <div className="teachers-titlebar">
          <span>{constant.title_teachers}</span>
          <Button
            variant="contained"
            onClick={navToCreation}
            startIcon={<AddIcon />}
          >
            {constant.button_add_teacher}
          </Button>
        </div>
      }
    >
      <div className="teachers-card">
        {teacherList.length === 0 ? (
          <div className="teachers-empty-box">
            <span className="teachers-empty-text">
              {constant.teachers_empty}
            </span>
            <Button
              onClick={navToCreation}
              variant="contained"
              startIcon={<AddIcon />}
            >
              {constant.button_add_teacher}
            </Button>
          </div>
        ) : (
          <div className="teachers-table">
            <Table>
              <TableHead>
                <TableRow className="teachers-table-head-row">
                  {constant.teachers_header.map((i) => (
                    <TableCell key={i} className="teachers-table-head-cell">
                      {i}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherList.map((i: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{i.name}</TableCell>
                    <TableCell>{i.subject.label}</TableCell>
                    <TableCell>{i.email}</TableCell>
                    <TableCell>{splitContact(i.contactNumber)}</TableCell>
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

export default Teachers;
