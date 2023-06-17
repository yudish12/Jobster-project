import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateJobThunk, EditJobThunk } from "./jobThunk";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../Api/localStorage";

export const createJob = createAsyncThunk("jobs/create", CreateJobThunk);
export const editJob = createAsyncThunk("jobs/edit", EditJobThunk);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Job Created Successfully");
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      toast.success("Job Modified....");
    });
    builder.addCase(editJob.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
