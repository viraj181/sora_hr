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



export interface FetchAdminPayload {
  pageNumber: number;
  pageSize: number;
  search: string;
}

export interface AdminDataTypes {
  customIndex: number;
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  company_name: string;
  address: string;
  gst_number: string;
  gst_type: "REGISTERED" | "UNREGISTERED" | "COMPOSITION";
  profile_photo: ProfilePhoto;
  documents: Document[];
  status: "ACTIVE" | "INACTIVE";
  must_change_password: boolean;
  db_name: string;
  schema_name: string;
  created_at: string;
  updated_at: string;
}

export interface ProfilePhoto {
  id: number;
  type: "OTHER";
  url: string;
  image_path: string;
  original_filename: string;
  content_type: string;
  size: number;
  created_at: string;
}

export interface Document {
  id: number;
  type: "OTHER";
  url: string;
  image_path: string;
  original_filename: string;
  content_type: string;
  size: number;
  created_at: string;
}

export interface AdminFiltersTypes {
  page: number;
  limit: number;
  search: string;
  status: string;
  extraParams?: { [key: string]: string | number };
}

export interface AdminSliceTypes {
  // fetch  admin list states
  adminLoading: boolean;
  adminError: string;
  adminData: AdminDataTypes[];
  adminTotalItems: number;
  adminTotalPages: number;
  adminDataLength: number;
  adminFilters: AdminFiltersTypes;
  adminTableDataReload: string;

  adminId: number | null;
  adminModal: boolean;
  adminModalData: AdminDataTypes | null;
  adminModalLoader: boolean;

  // delete modal states
  adminDeleteModal: boolean;
  adminDeleteModalId: number | null;
}