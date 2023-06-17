import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/userslice";
import jobReducer from "./features/JobSlice/jobslice";
import AlljobReducer from "./features/AllJob slice/AlljobSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: AlljobReducer,
  },
});

export default store;
