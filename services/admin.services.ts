import apiInstance from "@/apis/apiConfig";
import { apiEndPoints } from "@/apis/apiConstant";
import { extractError, withReferenceKey } from "@/apis/loginApis";
import { AdminFormValues, FetchAdminPayload } from "@/types/admintypes";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const fetchAdminAPI = async (data: FetchAdminPayload) => {
  try {
    const response = await apiInstance.post(
      apiEndPoints.userApi,
      withReferenceKey(data),
    );
    return response.data;
  } catch (error) {
    toast.error(
      extractError(
        error as AxiosError<{
          message?: string;
          detail?: string;
          msg?: string;
        }>,
      ),
    );

    return extractError(
      error as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

export const fetchAdminAPIById = async (data: { adminId: number }) => {
  try {
    const response = await apiInstance.get(
      apiEndPoints.userApi + `${data.adminId}/`,
    );
    return response.data;
  } catch (error) {
    toast.error(
      extractError(
        error as AxiosError<{
          message?: string;
          detail?: string;
          msg?: string;
        }>,
      ),
    );

    return extractError(
      error as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

export const createAdminAPI = async (data: AdminFormValues) => {
  try {
    const response = await apiInstance.post(
      apiEndPoints.createAdminApi,
      withReferenceKey(data),
    );
    return response.data;
  } catch (error) {
    toast.error(
      extractError(
        error as AxiosError<{
          message?: string;
          detail?: string;
          msg?: string;
        }>,
      ),
    );

    return extractError(
      error as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

export const updateAdminAPIById = async (
  data: AdminFormValues & { adminId: number },
) => {
  try {
    const response = await apiInstance.put(
      apiEndPoints.userApi,
      withReferenceKey(data),
    );
    return response.data;
  } catch (error) {
    toast.error(
      extractError(
        error as AxiosError<{
          message?: string;
          detail?: string;
          msg?: string;
        }>,
      ),
    );

    return extractError(
      error as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};


export const updateAdminStatusAPI = async (data: { id: number, status: string }) => {
  try {
    const response = await apiInstance.patch(
      `api/v1/admins/${data.id}/status/`,
      withReferenceKey({ status: data.status }),
    );

    if (response.data.success) {
      return response.data;
    } else {
      toast.error(response?.data?.msg || response?.data?.message || "Failed to update admin status!");
    }
  } catch (error) {
    toast.error(
      extractError(
        error as AxiosError<{
          message?: string;
          detail?: string;
          msg?: string;
        }>,
      ),
    );

    return extractError(
      error as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};
