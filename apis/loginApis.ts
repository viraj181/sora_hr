"use client";
import axios, { AxiosError } from "axios";
import apiInstance, { ApiBaseUrl } from "./apiConfig";
import { AutoGenerate } from "@/lib/AutoGenerate";
import toast from "react-hot-toast";

export const extractError = (
  err: AxiosError<{ message?: string; detail?: string; msg?: string }>,
) => {
  return (
    err.response?.data?.message ||
    err.response?.data?.msg ||
    err.response?.data?.detail ||
    err.message ||
    "Something went wrong!"
  );
};

export const generateReferenceKey = () => {
  return AutoGenerate({
    length: 15,
    isSymbol: false,
  });
};

export const withReferenceKey = <
  T extends object & {
    extraParams?: object;
  },
>(
  data: T,
) => {
  const { extraParams, ...rest } = data;

  return {
    ...rest,
    ...(extraParams ?? {}),
    referenceKey: generateReferenceKey(),
  };
};
// ================== LOGIN API ==================
export const loginApi = async (data: { login: string; password: string }) => {
  try {
    const res = await axios.post(
      ApiBaseUrl + "api/v1/auth/login/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );

    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== CHANGE PASSWORD API ==================
export const changePasswordApi = async (data: {
  username: string;
  old_password: string;
  new_password: string;
}) => {
  try {
    const res = await axios.post(
      ApiBaseUrl + "admin/auth/change-default-password/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );

    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== VERIFY OTP API ==================
export const verifyOtpApi = async (data: {
  otp: string;
  reference_id: string;
  journey_id: string;
}) => {
  try {
    const res = await apiInstance.post(
      "api/v1/auth/login/verify-otp/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );
    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== FORGET PASSWORD API ==================
export const forgetPasswordApi = async (data: { email: string }) => {
  try {
    const res = await axios.post(
      ApiBaseUrl + "api/v1/auth/forgot-password/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );

    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== VERIFY FORGET PASSWORD OTP API ==================
export const verifyForgetPasswordOtpApi = async (data: {
  email: string | null;
  otp: string;
  reference_id: string;
  journey_id: string;
}) => {
  try {
    const res = await apiInstance.post(
      "api/v1/auth/forgot-password/verify-otp/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );
    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== FORGET CHANGE PASSWORD API ==================
export const forgotChangePasswordApi = async (data: {
  new_password: string;
  confirm_password: string;
  email: string;
}) => {
  try {
    const res = await apiInstance.post(
      ApiBaseUrl + "api/v1/auth/reset-password/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );

    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};

// ================== RESEND OTP API ==================
export const resendOtpApi = async (data: {
  journeyId: string;
  referenceId: string;
}) => {
  try {
    const res = await apiInstance.post(
      ApiBaseUrl + "admin/auth/resend-otp/",
      withReferenceKey(data),
    );
    return res.data;
  } catch (err) {
    toast.error(
      extractError(
        err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
      ),
    );

    return extractError(
      err as AxiosError<{ message?: string; detail?: string; msg?: string }>,
    );
  }
};
