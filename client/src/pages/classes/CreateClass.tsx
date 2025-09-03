import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newClassSchema } from "./schema/NewClassSchema";
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import constant from "../../constant/constant.json";
import "./style/CreateClass.css";

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
      level: "",
      name: undefined,
      teacher: "",
    },
  });

  const classCreation = async (data: any) => {
    await axiosInstance.post("/classes", {
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
        const res = await axiosInstance.get("/dropdown-options/class_level");
        setOptions({
          level: res.data.level,
          teachers: res.data.teachers,
        });
      } catch (error: any) {
        console.error("error", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout title={constant.title_add_class}>
      <Box component="form" onSubmit={handleSubmit(classCreation)}>
        <div className="create-class-card">
          <div className="create-class-panel">
            <div className="create-class-form-stack">
              <FormControl fullWidth error={!!errors.level} size="small">
                <label className="create-class-label">
                  {constant.form_label_class_level}
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
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? (
                          (selected as string)
                        ) : (
                          <span className="create-class-select-placeholder">
                            {constant.dropdown_placerholder_level}
                          </span>
                        )
                      }
                    >
                      {options.level.map((i: any) => (
                        <MenuItem key={i.id} value={i.code}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.level?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={!!errors.name} size="small">
                <label className="create-class-label">
                  {constant.form_label_class_name}
                </label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      error={errors.name?.message ? true : false}
                      placeholder={constant.text_placeholders_classname}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={!!errors.teacher} size="small">
                <label className="create-class-label">
                  {constant.form_label_class_teacher}
                </label>
                <Controller
                  control={control}
                  name="teacher"
                  render={({ field }) => (
                    <Select
                      variant="outlined"
                      value={field.value}
                      size="small"
                      displayEmpty
                      renderValue={(selected) =>
                        selected !== "" ? (
                          (selected as string)
                        ) : (
                          <span className="create-class-select-placeholder">
                            {constant.dropdown_placerholder_teacher}
                          </span>
                        )
                      }
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      {options.teachers.length === 0 ? (
                        <>
                          <MenuItem disabled>
                            <span>{constant.dropdown_placerholder_empty}</span>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              size="small"
                              onClick={() => navigate("/teachers/create")}
                            >
                              {constant.button_empty_teacher}
                            </Button>
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          {options.teachers.map((i: any) => (
                            <MenuItem key={i.id} value={i.email}>
                              {i.name}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.teacher?.message}</FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="create-class-actions">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("..", { relative: "path" })}
          >
            {constant.button_back}
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {constant.button_add_class}
          </Button>
        </div>
      </Box>
    </MainLayout>
  );
};

export default CreateClass;
