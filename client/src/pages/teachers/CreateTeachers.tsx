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
import "./style/CreateTeacher.css";

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
        <div className="create-teacher-panel">
          <div className="create-teacher-form-stack">
            {/* NAME */}
            <FormControl fullWidth error={!!errors.name} size="small">
              <label className="create-teacher-label">
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
              <label className="create-teacher-label">
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
                        <span className="create-teacher-select-placeholder">
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
              <label className="create-teacher-label">
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
              <label className="create-teacher-label">
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
        <div className="create-teacher-actions">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className="btn-no-transform"
            onClick={() => navigate("..", { relative: "path" })}
          >
            {constant.button_back}
          </Button>
          <Button
            variant="contained"
            type="submit"
            className="btn-no-transform"
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
