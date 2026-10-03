import { useEffect, useState } from "react";
import { getPublishedJobs } from "../services/jobService";
import JobCard from "./JobCard";
import "./JobSection.css";

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentJobs();
  }, []);

  const loadRecentJobs = async () => {
    try {
      setLoading(true);

      const data = await getPublishedJobs();

      /*
       * Show only recent jobs.
       * getPublishedJobs already sorts by created_at DESC.
       */
      setJobs((data || []).slice(0, 6));

    } catch (error) {
      console.error(
        "Error loading recent jobs:",
        error
      );

      setJobs([]);

    } finally {
      setLoading(false);
    }
  };

  /*
   * Don't show anything while loading.
   */
  if (loading) {
    return null;
  }

  /*
   * If there are no published jobs,
   * completely hide this section.
   */
  if (jobs.length === 0) {
    return null;
  }

  return (
    <section className="job-section">

      <div className="job-section-header">

        <div>
          <span className="section-label">
            LATEST OPPORTUNITIES
          </span>

          <h2>
            Recent Jobs
          </h2>

          <p>
            Explore the latest job opportunities
            posted on CodeWithShiva Jobs.
          </p>
        </div>

        <a
          href="/jobs"
          className="view-all-jobs"
        >
          View All Jobs →
        </a>

      </div>

      <div className="jobs-grid">

        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}

      </div>

    </section>
  );
}

export default JobSection;