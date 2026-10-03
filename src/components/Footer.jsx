import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <a
            href="/"
            className="footer-logo"
          >
            <span>CodeWith</span>
            <strong>Shiva</strong>
            <small>Jobs</small>
          </a>

          <p>
            Helping developers and freshers discover
            their next career opportunity.
          </p>

          <div className="footer-socials">

            <a href="#">
              Instagram
            </a>

            <a href="#">
              LinkedIn
            </a>

            <a href="#">
              GitHub
            </a>

          </div>

        </div>

        {/* Job Seekers */}

        <div className="footer-column">

          <h3>
            Job Seekers
          </h3>

          <a href="#">
            Find Jobs
          </a>

          <a href="#">
            Internships
          </a>

          <a href="#">
            Fresher Jobs
          </a>

          <a href="#">
            Saved Jobs
          </a>

        </div>

        {/* Companies */}

        <div className="footer-column">

          <h3>
            Companies
          </h3>

          <a href="#">
            Post a Job
          </a>

          <a href="#">
            Browse Candidates
          </a>

          <a href="#">
            Company Profiles
          </a>

          <a href="#">
            Hiring Solutions
          </a>

        </div>

        {/* Resources */}

        <div className="footer-column">

          <h3>
            Resources
          </h3>

          <a href="#">
            Career Tips
          </a>

          <a href="#">
            Resume Tips
          </a>

          <a href="#">
            Coding Resources
          </a>

          <a href="#">
            Contact Us
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 CodeWithShiva Jobs. All rights reserved.
        </p>

        <div>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;