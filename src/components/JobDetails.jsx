import "./JobDetails.css";

function JobDetails({ job, onClose }) {
  if (!job) {
    return null;
  }

  return (
    <div className="job-details-overlay">

      <div className="job-details-modal">

        {/* Close Button */}

        <button
          className="close-details-btn"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}

        <div className="details-header">

          <div className="details-company-logo">
            {job.logo}
          </div>

          <div>
            <h1>{job.title}</h1>

            <p className="details-company">
              {job.company}
            </p>
          </div>

        </div>

        {/* Job Information */}

        <div className="details-meta">

          <div>
            <span>📍</span>
            <strong>Location</strong>
            <p>{job.location}</p>
          </div>

          <div>
            <span>💼</span>
            <strong>Job Type</strong>
            <p>{job.type}</p>
          </div>

          <div>
            <span>🎓</span>
            <strong>Experience</strong>
            <p>{job.experience}</p>
          </div>

          <div>
            <span>💰</span>
            <strong>Salary</strong>
            <p>{job.salary}</p>
          </div>

        </div>

        {/* Skills */}

        <div className="details-section">

          <h2>
            Required Skills
          </h2>

          <div className="details-skills">

            {job.skills.map((skill) => (
              <span key={skill}>
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Description */}

        <div className="details-section">

          <h2>
            About This Role
          </h2>

          <p>
            We are looking for a motivated professional to join
            the team as a {job.title}. This opportunity is suitable
            for candidates interested in building their career in
            software development and technology.
          </p>

          <p>
            Candidates should have a good understanding of the
            required technologies and be willing to learn,
            collaborate with teams, and work on real-world
            projects.
          </p>

        </div>

        {/* Responsibilities */}

        <div className="details-section">

          <h2>
            Key Responsibilities
          </h2>

          <ul>

            <li>
              Develop and maintain software applications.
            </li>

            <li>
              Collaborate with developers and other teams.
            </li>

            <li>
              Write clean and maintainable code.
            </li>

            <li>
              Troubleshoot and resolve technical issues.
            </li>

            <li>
              Learn and work with modern technologies.
            </li>

          </ul>

        </div>

        {/* Apply */}

        <div className="details-footer">

          <div>
            <span>Posted</span>
            <strong>{job.posted}</strong>
          </div>

          <button className="apply-btn">
            Apply Now →
          </button>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;