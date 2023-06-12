import customFetch from "../../Api/customFetch";

console.log(customFetch);

export const registerThunk = async (user, thunkAPI) => {
  try {
    console.log(user);
    const resp = await customFetch.post("/auth/register", user);
    console.log(resp);
    return resp.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
