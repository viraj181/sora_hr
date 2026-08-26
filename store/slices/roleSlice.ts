import {
  createRoleAPI,
  fetchRoleAPI,
  fetchRoleAPIById,
  updateRoleAPIById,
  updateRoleStatusAPI,
} from "@/services/role.services";
import {
  RoleFormValues,
  RoleSliceTypes,
  FetchRolePayload,
} from "@/types/roleTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: RoleSliceTypes = {
  // fetch role list states
  roleLoading: false,
  roleError: "",
  roleData: [],
  roleTotalItems: 0,
  roleTotalPages: 0,
  roleDataLength: 0,
  roleFilters: {
    page: 1,
    limit: 20,
    search: "",
    status: "",
    extraParams: {},
  },
  roleTableDataReload: "",

  // modal states
  roleId: null,
  roleModal: false,
  roleModalData: null,
  roleModalLoader: false,

  // delete modal states
  roleDeleteModal: false,
  roleDeleteModalId: null,
};

// fetch role list
export const fetchRole = createAsyncThunk(
  "role/fetchAll",
  async (data: FetchRolePayload, { rejectWithValue }) => {
    const response = await fetchRoleAPI(data);

    if (response?.success) {
      return {
        roleData: response?.data?.results,
        totalCount: response?.data?.pagination?.count || 0,
        totalPages: response?.data?.pagination?.total_pages || 0,
        dataLength: response?.data?.results?.length || 0,
      };
    }

    return rejectWithValue(response?.msg || "Failed to fetch Role!");
  },
);

// add role
export const createRole = createAsyncThunk(
  "role/add",
  async (data: RoleFormValues, { rejectWithValue }) => {
    const response = await createRoleAPI(data);

    if (response?.success) {
      toast.success(response?.message || "Role added successfully!");
      return response?.data;
    }

    return rejectWithValue(response?.msg || "Failed to add Role!");
  },
);

// fetch role by id
export const fetchRoleData = createAsyncThunk(
  "role/fetchRoleById",
  async (data: { roleId: number }, { rejectWithValue }) => {
    const response = await fetchRoleAPIById(data);

    if (response?.success) {
      return {
        roleModalData: response?.data,
      };
    }

    return rejectWithValue(response?.msg || "Failed to fetch Role!");
  },
);

// update role
export const updateRole = createAsyncThunk(
  "role/updateById",
  async (
    data: RoleFormValues & { roleId: number },
    { rejectWithValue },
  ) => {
    const response = await updateRoleAPIById(data);

    if (response?.success) {
      toast.success(response?.msg || "Role updated successfully!");
      return response?.data?.results;
    }

    return rejectWithValue(response?.msg || "Failed to update Role!");
  },
);

// role block / unblock
export const updateRoleStatus = createAsyncThunk(
  "role/updateRoleStatus",
  async (data: { id: number; status: string }) => {
    const response = await updateRoleStatusAPI(data);

    return response;
  },
);

const roleSlice = createSlice({
  name: "role",
  initialState,

  reducers: {
    setRoleLoading: (state, action) => {
      state.roleLoading = action.payload.roleLoading;
    },

    setRoleError: (state, action) => {
      state.roleError = action.payload.roleError;
    },

    setRoleData: (state, action) => {
      state.roleData = action.payload.roleData;
    },

    setRoleTotalItems: (state, action) => {
      state.roleTotalItems = action.payload.roleTotalItems;
    },

    setRoleTotalPages: (state, action) => {
      state.roleTotalPages = action.payload.roleTotalPages;
    },

    setRoleDataLength: (state, action) => {
      state.roleDataLength = action.payload.roleDataLength;
    },

    setRoleFilters: (state, action) => {
      state.roleFilters.page = action.payload.page;
      state.roleFilters.limit = action.payload.limit;
      state.roleFilters.search = action.payload.search;
      state.roleFilters.status = action.payload.status;
    },

    setRoleTableDataReload: (state, action) => {
      state.roleTableDataReload = action.payload.roleTableDataReload;
    },

    setRoleModal: (state, action) => {
      state.roleModal = action.payload.roleModal;
    },

    setRoleId: (state, action) => {
      state.roleId = action.payload.roleId;
    },

    setRoleModalData: (state, action) => {
      state.roleModalData = action.payload.roleModalData;
    },

    setRoleDeleteModal: (state, action) => {
      state.roleDeleteModal = action.payload.roleDeleteModal;
    },

    setRoleDeleteModalId: (state, action) => {
      state.roleDeleteModalId = action.payload.roleDeleteModalId;
    },

    setRoleInitialValues: () => {
      return initialState;
    },
  },

  extraReducers(builder) {
    // fetch role list
    builder
      .addCase(fetchRole.pending, (state) => {
        state.roleLoading = true;
        state.roleError = "";
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleData = action.payload.roleData;
        state.roleTotalItems = action.payload.totalCount;
        state.roleTotalPages = action.payload.totalPages;
        state.roleDataLength = action.payload.dataLength;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = action.error.message || "";
        state.roleData = [];
      });

    // fetch role by id
    builder
      .addCase(fetchRoleData.pending, (state) => {
        state.roleModalLoader = true;
        state.roleError = "";
      })
      .addCase(fetchRoleData.fulfilled, (state, action) => {
        state.roleModalLoader = false;
        state.roleModalData = action.payload.roleModalData;
      })
      .addCase(fetchRoleData.rejected, (state, action) => {
        state.roleModalLoader = false;
        state.roleError = action.error.message || "";
        state.roleModalData = null;
      });

    // add role
    builder
      .addCase(createRole.pending, (state) => {
        state.roleError = "";
      })
      .addCase(createRole.fulfilled, (state) => {
        state.roleModal = false;
        state.roleTableDataReload = new Date().getTime().toString();
      })
      .addCase(createRole.rejected, (state, action) => {
        state.roleError = action.error.message || "";
      });

    // update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.roleError = "";
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.roleModal = false;
        state.roleTableDataReload = new Date().getTime().toString();
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.roleError = action.error.message || "";
      });
  },
});

export const {
  setRoleLoading,
  setRoleError,
  setRoleData,
  setRoleTotalItems,
  setRoleTotalPages,
  setRoleDataLength,
  setRoleFilters,
  setRoleTableDataReload,

  setRoleModal,
  setRoleId,
  setRoleModalData,

  setRoleDeleteModal,
  setRoleDeleteModalId,

  setRoleInitialValues,
} = roleSlice.actions;

export default roleSlice.reducer;
