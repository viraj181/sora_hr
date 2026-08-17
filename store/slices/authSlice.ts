import apiInstance from "@/apis/apiConfig";
import { extractError } from "@/apis/loginApis";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface AuthState {
  loginData: {
    referenceId: string;
    journeyId: string;
    isAuthSetup: boolean;
    isDefaultChange: boolean;
    otp: string;
  } | null;
  forgetPassData: {
    referenceId: string;
    journeyId: string;
  } | null;
  token: string | null;
  email: string | null;
  baseImageUrl: string;
  userData: {
    userInfo: {
      name: string;
    };
    personalInfo: {
      isTotpEnabled: boolean;
    };
  } | null;
}

const initialState: AuthState = {
  loginData: {
    referenceId: "",
    journeyId: "",
    isAuthSetup: false,
    isDefaultChange: false,
    otp: "",
  },
  forgetPassData: {
    referenceId: "",
    journeyId: "",
  },
  token: null,
  email: null,
  baseImageUrl: "",
  userData: {
    userInfo: {
      name: "",
    },
    personalInfo: {
      isTotpEnabled: false,
    },
    // is2fa: false,
  },
};

export const adminDetailsAPI = async () => {
  try {
    const response = await apiInstance.get(
      `admin/users/profile/`,
      // withReferenceKey(),
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

export const adminDetail = createAsyncThunk(
  "admin/adminDetail",
  async (_, { rejectWithValue }) => {
    const response = await adminDetailsAPI();
    if (response?.st) {
      return {
        userData: response?.data,
      };
    } else {
      // toast.error(response?.msg || "Failed to fetch admin!");
      return rejectWithValue(response?.msg || "Failed to fetch admin!");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setForgetPassData: (state, action) => {
      state.forgetPassData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBaseImageUrl: (state, action) => {
      state.baseImageUrl = action.payload;
    },
    logout: (state) => {
      state.loginData = null;
      state.token = "";
      state.email = "";
      state.baseImageUrl = "";
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminDetail.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
    });
  },
});

export const {
  setLoginData,
  setForgetPassData,
  logout,
  setToken,
  setEmail,
  setBaseImageUrl,
  setUserData,
} = authSlice.actions;
export default authSlice.reducer;
