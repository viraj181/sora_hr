import * as Yup from "yup";

export type GstType = "REGISTERED" | "UNREGISTERED";

export interface AdminFormValues {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  company_name: string;
  address?: string;
  gst_number?: string;
  gst_type?: GstType;
  profile_photo_id?: number;
  documents?: Record<string, unknown> | unknown[];
}
