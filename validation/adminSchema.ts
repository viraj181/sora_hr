import * as Yup from "yup";

export const adminValidationSchema = Yup.object({
  first_name: Yup.string().trim().required("First name is required"),

  last_name: Yup.string().trim().required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  contact_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .required("Contact number is required"),

  company_name: Yup.string().trim().required("Company name is required"),

  address: Yup.string().trim().optional(),

  gst_number: Yup.string()
    .max(15, "GST number must not exceed 15 characters")
    .optional(),

  gst_type: Yup.string()
    .optional(),

});
