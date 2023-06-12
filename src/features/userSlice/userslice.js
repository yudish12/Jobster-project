import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./userThunk";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../Api/localStorage";
import { toast } from "react-toastify";
export const userRegister = createAsyncThunk("user/register", registerThunk);

const initialState = {
  isLoading: false,
  error: null,
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
      console.log(action);
      state.error = action.payload;
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
  },
});

const { actions, reducer } = userSlice;

export const { clearError } = actions;
export default reducer;
