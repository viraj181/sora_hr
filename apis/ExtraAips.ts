"use client";
import { AxiosError } from "axios";
import apiInstance, { formDataApiInstance } from "./apiConfig";
import {
  extractError,
  generateReferenceKey,
  withReferenceKey,
} from "./loginApis";
import toast from "react-hot-toast";
import cookies from "js-cookie";
import { apiEndPoints } from "./apiConstant";

export const DeleteApi = async ({
  url,
  data,
}: {
  url: string;
  data: { [key: string]: string | number };
}) => {
  try {
    const res = await apiInstance.delete(`${url}`, {
      data: withReferenceKey(data),
    });
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );
    throw extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

export const UploadImageApi = async ({
  uploadedFiles,
  fileType,
  url = apiEndPoints.imageUploadApi,
}: {
  uploadedFiles: File[];
  fileType: string;
  url?: string;
}) => {
  try {
    const formData = new FormData();

    uploadedFiles.forEach((file: File) => {
      formData.append("image", file);
    });
    formData.append("types", fileType);
    formData.append("referenceKey", generateReferenceKey());
    const res = await formDataApiInstance.post(url, formData);
    if (res?.data?.st) {
      return { st: true, files: res?.data?.data?.files };
    }
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );
    throw extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

export async function GetDeviceId() {
  const deviceId = cookies.get("device_id");

  return deviceId;
}
