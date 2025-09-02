import * as Yup from "yup";

export const newClassSchema = Yup.object({
  name: Yup.string().required("Please enter class name."),
  level: Yup.string().required("Please select class level."),
  teacher: Yup.number().required("Please select a Teacher."),
});
