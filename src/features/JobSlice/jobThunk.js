import customFetch from "../../Api/customFetch";
import { clearValues } from "./jobslice";

export const CreateJobThunk = async (jobData, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const EditJobThunk = async ({ jobId, job }, thunkAPI) => {
  console.log(jobId, job);
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
