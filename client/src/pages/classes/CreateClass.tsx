import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
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

  const [age, setAge] = useState();

  const handleChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
  };

  const [options, setOptions] = useState({
    level: [],
    teachers: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newClassSchema),
    defaultValues: {
      level: undefined,
      name: undefined,
      teacher: undefined,
    },
  });

  const classCreation = (data: any) => {
    console.log("data");
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/getDropdownOption").then((res) => {
      console.log("res", res.data);
      setOptions({
        level: res.data.level,
        teachers: res.data.subject,
      });
    });
  }, []);

  return (
    <MainLayout title="Add Class">
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
                style={{ color: "#333", fontWeight: 600, marginBottom: "8px" }}
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
                style={{ color: "#333", fontWeight: 600, marginBottom: "8px" }}
              >
                Class Name
              </label>
              <TextField placeholder="Class Name" size="small" />
            </FormControl>

            <FormControl fullWidth>
              <label
                style={{ color: "#333", fontWeight: 600, marginBottom: "8px" }}
              >
                Form Teacher
              </label>
              <Select
                variant="outlined"
                value={age}
                onChange={handleChange}
                size="small"
              >
                {options.teachers.map((i: any) => (
                  <MenuItem key={i.id} value={i.code}>
                    {i.label}
                  </MenuItem>
                ))}
              </Select>
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
        <Button variant="contained" style={{ textTransform: "none" }}>
          Add Class
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateClass;
