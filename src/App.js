import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "./pages/Dashboard/SharedLayout";
import Stats from "./pages/Dashboard/Stats";
import Alljobs from "./pages/Dashboard/Alljobs";
import Addjobs from "./pages/Dashboard/Addjobs";
import Profile from "./pages/Dashboard/Profile";
import ProtectedRoute from "./pages/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<Alljobs />} />
          <Route path="add-job" element={<Addjobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
