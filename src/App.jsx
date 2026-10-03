import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Internships from "./pages/Internships";
import Companies from "./pages/Companies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import JobDetailsPage from "./pages/JobDetailsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import JobApplication from "./pages/JobApplication";
// import JobDetailsPage from "./pages/JobDetailsPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/internships"
          element={<Internships />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      <Route
  path="/admin/post-job"
  element={
    <AdminRoute>
      <PostJob />
    </AdminRoute>
  }
/>
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        <Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/manage-jobs"
  element={
    <AdminRoute>
      <ManageJobs />
    </AdminRoute>
  }
/>
<Route
  path="/admin/edit-job/:id"
  element={
    <AdminRoute>
      <EditJob />
    </AdminRoute>
  }
/>
<Route path="/jobs/:id" element={<JobDetailsPage />} />
<Route
  path="/job-application/:id"
  element={<JobApplication />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;