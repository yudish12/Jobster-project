import customFetch from "../../Api/customFetch";
import { getAlljobs } from "./AlljobSlice";

export const getAlljobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs", {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data.jobs;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(getAlljobs());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
