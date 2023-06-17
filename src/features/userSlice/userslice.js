import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, updateThunk } from "./userThunk";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../Api/localStorage";
import { toast } from "react-toastify";

export const userRegister = createAsyncThunk("user/register", registerThunk);
export const userLogin = createAsyncThunk("user/login", loginThunk);
export const userUpdate = createAsyncThunk("user/update", updateThunk);

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
    error(state, action) {
      state.error = action.payload;
    },
    toggleSidebar(state, action) {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    logout(state, action) {
      removeUserFromLocalStorage();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(userUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      const user = action.payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`user data updated successfully`);
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;

export const { clearError, toggleSidebar, logout } = actions;
export default reducer;
