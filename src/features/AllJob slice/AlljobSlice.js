import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteJobThunk, getAlljobsThunk } from "./AlljobThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAlljobs = createAsyncThunk("/get/alljobs", getAlljobsThunk);
export const deleteJob = createAsyncThunk("/delete/job", deleteJobThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAlljobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlljobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    });
    builder.addCase(getAlljobs.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success(action.payload.msg);
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export default allJobsSlice.reducer;
