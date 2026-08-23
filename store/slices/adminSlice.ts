import {
  createAdminAPI,
  fetchAdminAPI,
  fetchAdminAPIById,
  updateAdminAPIById
} from "@/services/admin.services";
import { AdminFormValues, AdminSliceTypes, FetchAdminPayload } from "@/types/admintypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: AdminSliceTypes = {
  // fetch admin list states
  adminLoading: false,
  adminError: "",
  adminData: [],
  adminTotalItems: 0,
  adminTotalPages: 0,
  adminDataLength: 0,
  adminFilters: {
    page: 1,
    limit: 20,
    search: "",
    status: "",
    extraParams: {},
  },
  adminTableDataReload: "",

  // modal states
  adminId: null,
  adminModal: false,
  adminModalData: null,
  adminModalLoader: false,

  // delete modal states
  adminDeleteModal: false,
  adminDeleteModalId: null,
};

// fetch admin List
export const fetchAdmin = createAsyncThunk(
  "admin/fetchAll",
  async (data: FetchAdminPayload, { rejectWithValue }) => {
    const response = await fetchAdminAPI(data);
    if (response?.success) {
      return {
        adminData: response?.data,
        totalCount: response?.meta?.pagination?.totalItems || 0,
        totalPages: response?.meta?.pagination?.totalPages || 0,
        dataLength: response?.data?.length || 0,
      };
    } else {
      return rejectWithValue(response?.msg || "Failed to fetch Admin!");
    }
  },
);

// add admin
export const createAdmin = createAsyncThunk(
  "admin/add",
  async (data: AdminFormValues, { rejectWithValue }) => {
    const response = await createAdminAPI(data);
    if (response?.success) {
      toast.success(response?.msg || "Admin added successfully!");
      return response?.data;
    } else {
      return rejectWithValue(response?.msg || "Failed to add Admin!");
    }
  },
);

// fetch admin By Id
export const fetchAdminData = createAsyncThunk(
  "admin/fetchAdminById",
  async (data: { adminId: number }, { rejectWithValue }) => {
    const response = await fetchAdminAPIById(data);
    if (response?.success) {
      return { adminModalData: response?.data };
    } else {
      return rejectWithValue(response?.msg || "Failed to fetch Admin!");
    }
  },
);

// update admin
export const updateAdmin = createAsyncThunk(
  "admin/updateById",
  async (data: AdminFormValues & { adminId: number }, { rejectWithValue }) => {
    const response = await updateAdminAPIById(data);
    if (response?.success) {
      toast.success(response?.msg || "Admin updated successfully!");
      return response?.data.results;
    } else {
      return rejectWithValue(response?.msg || "Failed to update Admin!");
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {

    setAdminLoading: (state, action) => {
      state.adminLoading = action.payload.adminLoading;
    },
    setAdminError: (state, action) => {
      state.adminError = action.payload.adminError;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload.adminData;
    },
    setAdminTotalItems: (state, action) => {
      state.adminTotalItems = action.payload.adminTotalItems;
    },
    setAdminTotalPages: (state, action) => {
      state.adminTotalPages = action.payload.adminTotalPages;
    },
    setAdminDataLength: (state, action) => {
      state.adminDataLength = action.payload.adminDataLength;
    },
    setAdminFilters: (state, action) => {
      state.adminFilters.page = action.payload.page;
      state.adminFilters.limit = action.payload.limit;
      state.adminFilters.search = action.payload.search;
      state.adminFilters.status = action.payload.status;
    },
    setAdminTableDataReload: (state, action) => {
      state.adminTableDataReload = action.payload.adminTableDataReload;
    },

    setAdminModal: (state, action) => {
      state.adminModal = action.payload.adminModal;
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload.adminId;
    },
    setAdminModalData: (state, action) => {
      state.adminModalData = action.payload.adminModalData;
    },

    setAdminDeleteModal: (state, action) => {
      state.adminDeleteModal = action.payload.adminDeleteModal;
    },
    setAdminDeleteModalId: (state, action) => {
      state.adminDeleteModalId = action.payload.adminDeleteModalId;
    },

    setAdminInitialValues: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    // fetch admin List
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.adminLoading = true;
        state.adminError = "";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminData = action.payload.adminData;
        state.adminTotalItems = action.payload.totalCount;
        state.adminTotalPages = action.payload.totalPages;
        state.adminDataLength = action.payload.dataLength;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.error.message || "";
        state.adminData = [];
      });

    // fetch admin by id
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.adminModalLoader = true;
        state.adminError = "";
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.adminModalLoader = false;
        state.adminModalData = action.payload.adminModalData;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.adminModalLoader = false;
        state.adminError = action.error.message || "";
        state.adminModalData = null;
      });

    // add admin
    builder
      .addCase(createAdmin.pending, (state) => {
        state.adminError = "";
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.adminModal = false;
        state.adminTableDataReload = new Date().getTime().toString();
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.adminError = action.error.message || "";
      });

    // add admin
    builder
      .addCase(updateAdmin.pending, (state) => {
        state.adminError = "";
      })
      .addCase(updateAdmin.fulfilled, (state) => {
        state.adminModal = false;
        state.adminTableDataReload = new Date().getTime().toString();
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.adminError = action.error.message || "";
      });
  },
});

export const {
  setAdminLoading,
  setAdminError,
  setAdminData,
  setAdminTotalItems,
  setAdminTotalPages,
  setAdminDataLength,
  setAdminFilters,
  setAdminTableDataReload,

  setAdminModal,
  setAdminId,
  setAdminModalData,

  setAdminDeleteModal,
  setAdminDeleteModalId,

  setAdminInitialValues,
} = adminSlice.actions;

export default adminSlice.reducer;
