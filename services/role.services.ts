import apiInstance from "@/apis/apiConfig";
import { apiEndPoints } from "@/apis/apiConstant";
import { extractError, withReferenceKey } from "@/apis/loginApis";
import { RoleFormValues, FetchRolePayload } from "@/types/roleTypes";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const fetchRoleAPI = async (data: FetchRolePayload) => {
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
      error as AxiosError<{
        message?: string;
        detail?: string;
        msg?: string;
      }>,
    );
  }
};

export const fetchRoleAPIById = async (data: { roleId: number }) => {
  try {
    const response = await apiInstance.get(
      apiEndPoints.userApi + `${data.roleId}/`,
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
      error as AxiosError<{
        message?: string;
        detail?: string;
        msg?: string;
      }>,
    );
  }
};

export const createRoleAPI = async (data: RoleFormValues) => {
  try {
    const response = await apiInstance.post(
      apiEndPoints.createRoleApi,
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
      error as AxiosError<{
        message?: string;
        detail?: string;
        msg?: string;
      }>,
    );
  }
};

export const updateRoleAPIById = async (
  data: RoleFormValues & { roleId: number },
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
      error as AxiosError<{
        message?: string;
        detail?: string;
        msg?: string;
      }>,
    );
  }
};

export const updateRoleStatusAPI = async (
  data: { id: number; status: string },
) => {
  try {
    const response = await apiInstance.patch(
      `api/v1/roles/${data.id}/status/`,
      withReferenceKey({ status: data.status }),
    );

    if (response.data.success) {
      return response.data;
    } else {
      toast.error(
        response?.data?.msg ||
        response?.data?.message ||
        "Failed to update role status!",
      );
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
      error as AxiosError<{
        message?: string;
        detail?: string;
        msg?: string;
      }>,
    );
  }
};
