import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { newTeacherSchema } from "./schema/NewTeacherSchema";
import axiosInstance from "../../utilities/axiosInstance";
import constant from "../../constant/constant.json";

const CreateTeachers: React.FC = () => {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newTeacherSchema),
    defaultValues: {
      email: undefined,
      phone: undefined,
      name: undefined,
      subject: "",
    },
  });

  const teacherCreation = async (data: any) => {
    console.log("data", data);
    try {
      await axiosInstance.post("/teachers", {
        name: data.name,
        subject: data.subject,
        email: data.email,
        contactNumber: data.phone,
      });
      navigate("../", { relative: "path" });
      reset();
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/dropdown-options/teachers`);
        setOptions(res.data.subject);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout title={constant.title_add_teacher}>
      <Box component="form" onSubmit={handleSubmit(teacherCreation)}>
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
              {/* NAME */}
              <FormControl fullWidth error={!!errors.name} size="small">
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  {constant.form_label_teacher_name}
                </label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      error={errors.email?.message ? true : false}
                      placeholder={constant.text_placeholders_name}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>

              {/* SUBJECT */}
              <FormControl fullWidth error={!!errors.subject} size="small">
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  {constant.form_label_teacher_subject}
                </label>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="outlined"
                      value={field.value ?? " "}
                      onChange={field.onChange}
                      size="small"
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? (
                          (selected as string)
                        ) : (
                          <span style={{ opacity: 0.5 }}>
                            {constant.dropdown_placerholder_subject}
                          </span>
                        )
                      }
                    >
                      {options.map((i: any) => (
                        <MenuItem key={i.id} value={i.code}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.subject?.message}</FormHelperText>
              </FormControl>

              {/* EMAIL */}
              <FormControl fullWidth error={!!errors.email} size="small">
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  {constant.form_label_teacher_email}
                </label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      error={errors.email?.message ? true : false}
                      placeholder={constant.text_placeholders_email}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                <FormHelperText>{errors.email?.message}</FormHelperText>
              </FormControl>

              {/* PHONE NUMBER */}
              <FormControl fullWidth error={!!errors.phone} size="small">
                <label
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  {constant.form_label_teacher_phone}
                </label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <TextField
                      error={errors.phone?.message ? true : false}
                      placeholder={constant.text_placeholders_phone}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                <FormHelperText>{errors.phone?.message}</FormHelperText>
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
            {constant.button_back}
          </Button>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            type="submit"
            disabled={isSubmitting}
          >
            {constant.button_add_class}
          </Button>
        </div>
      </Box>
    </MainLayout>
  );
};

export default CreateTeachers;
