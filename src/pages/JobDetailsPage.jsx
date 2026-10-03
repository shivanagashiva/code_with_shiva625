import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { supabase } from "../lib/supabaseClient";

import "./JobDetailsPage.css";

function JobDetailsPage() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (error) {
      console.error(
        "Error fetching job:",
        error
      );

      setError(
        "Job not found or no longer available."
      );
    } else {
      setJob(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="job-details-page">
        <div className="job-details-container">
          <p className="loading-text">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-details-page">

        <div className="job-details-container">

          <Link
            to="/jobs"
            className="back-link"
          >
            ← Back to Jobs
          </Link>

          <div className="job-error">

            <h2>Job Not Found</h2>

            <p>{error}</p>

            <Link
              to="/jobs"
              className="back-jobs-btn"
            >
              Browse Jobs
            </Link>

          </div>

        </div>

      </div>
    );
  }

  const skills = Array.isArray(job.skills)
    ? job.skills
    : String(job.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  const responsibilities =
    String(job.responsibilities || "")
      .split(/\n|•/)
      .map((item) => item.trim())
      .filter(Boolean);

  const requirements =
    String(job.requirements || "")
      .split(/\n|•/)
      .map((item) => item.trim())
      .filter(Boolean);

  return (
    <div className="job-details-page">

      <div className="job-details-container">

        <Link
          to="/jobs"
          className="back-link"
        >
          ← Back to Jobs
        </Link>


        <div className="job-details-card">

          {/* HEADER */}

          <div className="job-details-header">

            <div>

              <h1>
                {job.title}
              </h1>

              <p className="company-name">
                {job.company}
              </p>

            </div>

            <div className="job-logo">
              {job.company
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

          </div>


          {/* META */}

          <div className="job-meta">

            <span>
              📍 {job.location}
            </span>

            <span>
              💼 {job.job_type || job.type}
            </span>

            <span>
              🎓 {job.experience}
            </span>

            {job.salary && (
              <span>
                💰 {job.salary}
              </span>
            )}

          </div>


          {/* CONTENT */}

          <div className="job-details-content">

            <section>

              <h2>
                Job Description
              </h2>

              <p>
                {job.description ||
                  "No job description available."}
              </p>

            </section>


            {responsibilities.length > 0 && (
              <section>

                <h2>
                  Responsibilities
                </h2>

                <ul className="responsibilities-list">

                  {responsibilities.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </section>
            )}


            {requirements.length > 0 && (
              <section>

                <h2>
                  Requirements
                </h2>

                <ul className="responsibilities-list">

                  {requirements.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </section>
            )}


            {skills.length > 0 && (
              <section>

                <h2>
                  Skills
                </h2>

                <div className="skills-list">

                  {skills.map(
                    (skill, index) => (
                      <span key={index}>
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </section>
            )}

          </div>


          {/* APPLY */}

          <div className="apply-section">

            {job.apply_url ? (

              <a
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Apply Now →
              </a>

            ) : (

              <button
                className="apply-btn"
                disabled
              >
                Application Link Unavailable
              </button>

            )}

            <p>
              You will be redirected to
              the company's application website.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobDetailsPage;