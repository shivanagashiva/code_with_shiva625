import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <main className="admin-page">

      <div className="page-container">

        <div className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage CodeWithShiva Jobs</p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="admin-grid">

         <Link
  to="/admin/manage-jobs"
  className="admin-card"
>
            <span>➕</span>

            <h2>Post a Job</h2>

            <p>
              Add a new job opportunity.
            </p>
          </Link>

          <Link
            to="/jobs"
            className="admin-card"
          >
            <span>💼</span>

            <h2>Manage Jobs</h2>

            <p>
              View and manage job listings.
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}

export default AdminDashboard;