import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const showComingSoon = (e) => {
    e.preventDefault();
    alert("Login & Registration are coming soon! 🚀");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <span className="logo-code">CodeWith</span>
          <span className="logo-shiva">Shiva</span>
          <span className="logo-jobs">Jobs</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/internships">Internships</Link>
          <Link to="/companies">Companies</Link>
        </div>

        <div className="navbar-actions">

          <a
            href="#"
            className="login-btn"
            onClick={showComingSoon}
          >
            Login
          </a>

          {/* <Link
            to="/post-job"
            className="post-job-btn"
          >
            Post a Job
          </Link> */}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;