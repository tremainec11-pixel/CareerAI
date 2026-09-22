import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Jobs from "../pages/jobs/Jobs";
import Login from "../pages/auth/Login";
import AddJob from "../pages/jobs/AddJob";
import Register from "../pages/auth/Register";
import Resumes from "../pages/resumes/Resumes";
import NewInterview from "../pages/NewInterview";
import EditInterview from "../pages/EditInterview";
import AddResume from "../pages/resumes/AddResume";
import JobDetails from "../pages/jobs/JobDetails";
import ResumeDetails from "../pages/resumes/ResumeDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import Applications from "../pages/applications/Applications";
import Interviews from "../pages/Interviews";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/jobs"
              element={<Jobs />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/interviews"
              element={<Interviews />}
            />

            <Route
              path="/interviews/new"
              element={<NewInterview />}
            />

            <Route
  path="/interviews/:id/edit"
  element={<EditInterview />}
/>

            <Route
              path="/jobs/new"
              element={<AddJob />}
            />

            <Route
              path="/jobs/:id"
              element={<JobDetails />}
            />

            <Route
              path="/resumes"
              element={<Resumes />}
            />

            <Route
              path="/resumes/new"
              element={<AddResume />}
            />

            <Route
              path="/resumes/:id"
              element={<ResumeDetails />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
