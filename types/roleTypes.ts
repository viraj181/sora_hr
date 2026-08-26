import * as Yup from "yup";

export type GstType = "REGISTERED" | "UNREGISTERED";

export interface RoleFormValues {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  company_name: string;
  address?: string;
  gst_number?: string;
  gst_type?: GstType;
  profile_photo?: number;
  documents?: number;
}

export interface FetchRolePayload {
  pageNumber: number;
  pageSize: number;
  search: string;
}

export interface RoleDataTypes {
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
  is_active: boolean;
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

export interface RoleFiltersTypes {
  page: number;
  limit: number;
  search: string;
  status: string;
  extraParams?: {
    [key: string]: string | number;
  };
}

export interface RoleSliceTypes {
  // fetch role list states
  roleLoading: boolean;
  roleError: string;
  roleData: RoleDataTypes[];
  roleTotalItems: number;
  roleTotalPages: number;
  roleDataLength: number;
  roleFilters: RoleFiltersTypes;
  roleTableDataReload: string;

  roleId: number | null;
  roleModal: boolean;
  roleModalData: RoleDataTypes | null;
  roleModalLoader: boolean;

  // delete modal states
  roleDeleteModal: boolean;
  roleDeleteModalId: number | null;
}
