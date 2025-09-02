import * as Yup from "yup";

export const newTeacherSchema = Yup.object({
  name: Yup.string().required("Please enter class name."),
  subject: Yup.string().required("Please select a subject"),
  email: Yup.string().required("Please enter email."),
  phone: Yup.number().required("Please enter phone number."),
});
