import customFetch from "../../Api/customFetch";

console.log(customFetch);

export const registerThunk = async (user, thunkAPI) => {
  try {
    console.log(user);
    const resp = await customFetch.post("/auth/testingRegister", user);
    console.log(resp);
    return resp.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
