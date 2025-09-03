import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newClassSchema } from "./schema/NewClassSchema";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateClass = () => {
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    level: [],
    teachers: [],
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newClassSchema),
    defaultValues: {
      level: "P2",
      name: "2A",
      teacher: "teachermary@gmail.com",
    },
  });

  const classCreation = async (data: any) => {
    console.log("data", data);

    await axios.post("http://localhost:4000/api/classes", {
      name: data.name,
      level: data.level,
      teacherEmail: data.teacher,
    });
    reset();
    navigate("../", { relative: "path" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dropdown-options",
        );
        console.log("res", res.data);
        setOptions({
          level: res.data.level,
          teachers: res.data.teachers,
        });
      } catch (error: any) {
        console.error("error", error.message);
      }
    };
  }, []);

  return (
    <MainLayout title="Add Class">
      <Box component="form" onSubmit={handleSubmit(classCreation)}>
        <div
          style={{
            backgroundColor: "white",
            maxHeight: "636px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              height: "100%",
              padding: "32px",
              boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.2)",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "464px",
                display: "flex",
                gap: "24px",
                flexDirection: "column",
              }}
            >
              <FormControl fullWidth error={!!errors.level} size="small">
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Class Level
                </label>
                <Controller
                  name="level"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                      size="small"
                    >
                      {options.level.map((i: any) => (
                        <MenuItem key={i.id} value={i.code}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Class Name
                </label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      placeholder="Class Name"
                      size="small"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Form Teacher
                </label>
                <Controller
                  control={control}
                  name="teacher"
                  render={({ field }) => (
                    <Select
                      variant="outlined"
                      value={field.value}
                      size="small"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      {options.teachers.map((i: any) => (
                        <MenuItem key={i.id} value={i.email}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "24px",
            justifyContent: "end",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            style={{ textTransform: "none" }}
            onClick={() => navigate("..", { relative: "path" })}
          >
            Back
          </Button>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            type="submit"
            disabled={isSubmitting}
          >
            Add Class
          </Button>
        </div>
      </Box>
    </MainLayout>
  );
};

export default CreateClass;
