import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  const skills = Array.isArray(job.skills)
    ? job.skills
    : String(job.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  return (
    <div className="job-card">

      {/* =========================
          TOP SECTION
      ========================== */}

      <div className="job-card-top">

        <div className="company-logo">
          {job.company?.charAt(0)?.toUpperCase() || "J"}
        </div>

        <div className="job-card-title">

          <h3>
            {job.title}
          </h3>

          <p>
            {job.company}
          </p>

        </div>

        <button
          type="button"
          className="save-job-btn"
          aria-label="Save job"
        >
          ♡
        </button>

      </div>


      {/* =========================
          JOB META
      ========================== */}

      <div className="job-meta">

        {job.location && (
          <span>
            📍 {job.location}
          </span>
        )}

        {(job.job_type || job.type) && (
          <span>
            💼 {job.job_type || job.type}
          </span>
        )}

        {job.experience && (
          <span>
            🎓 {job.experience}
          </span>
        )}

      </div>


      {/* =========================
          SALARY
      ========================== */}

      {job.salary && (
        <div className="job-salary">
          💰 {job.salary}
        </div>
      )}


      {/* =========================
          SKILLS
      ========================== */}

      {skills.length > 0 && (
        <div className="job-skills">

          {skills
            .slice(0, 4)
            .map((skill, index) => (
              <span key={`${skill}-${index}`}>
                {skill}
              </span>
            ))}

        </div>
      )}


      {/* =========================
          FOOTER
      ========================== */}

      <div className="job-card-footer">

        <span className="job-card-posted">
          {job.posted || "Recently posted"}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="view-job-btn"
        >
          View Job →
        </Link>

      </div>

    </div>
  );
}

export default JobCard;