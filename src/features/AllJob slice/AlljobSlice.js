import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { deleteJobThunk, getAlljobsThunk, jobStatsThunk } from "./AlljobThunk";

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
export const jobStats = createAsyncThunk("/stats/jobs", jobStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlljobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlljobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.numOfPages = action.payload.numOfPages;
      state.totalJobs = action.payload.totalJobs;
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

    builder.addCase(jobStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(jobStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stats = action.payload.defaultStats;
      state.monthlyApplications = action.payload.monthlyApplications;
    });
  },
});

export const { handleChange, clearFilters, changePage } = allJobsSlice.actions;

export default allJobsSlice.reducer;
