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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Teachers</span>
          <Button
            variant="contained"
            onClick={navToCreation}
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
          >
            Add Teacher
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
        {teacherList.length === 0 ? (
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
              There are no existing teachers yet.
            </span>
            <Button
              onClick={navToCreation}
              variant="contained"
              style={{ textTransform: "none" }}
              startIcon={<AddIcon />}
            >
              Add Teacher
            </Button>
          </div>
        ) : (
          <div style={{ color: "black", padding: "32px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#e2e2e2" }}>
                  <TableCell style={{ fontWeight: 800 }}>#</TableCell>
                  <TableCell style={{ fontWeight: 800 }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 800 }}>Subject</TableCell>
                  <TableCell style={{ fontWeight: 800 }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 800 }}>
                    Work Contact
                  </TableCell>
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
