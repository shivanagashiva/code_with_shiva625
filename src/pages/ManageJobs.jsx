import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllJobs,
  deleteJob,
  toggleJobPublished,
} from "../services/jobService";
import "../App.css";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs();

      setJobs(data);
    } catch (error) {
      console.error("Unable to load jobs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (job) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}" at ${job.company}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(job.id);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (item) => item.id !== job.id
        )
      );

      alert("Job deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.message ||
        "Unable to delete job."
      );
    }
  };

  const handleTogglePublished = async (job) => {
    try {
      const updatedJob =
        await toggleJobPublished(
          job.id,
          !job.is_published
        );

      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.id === job.id
            ? updatedJob
            : item
        )
      );
    } catch (error) {
      console.error(
        "Publish status error:",
        error
      );

      alert(
        error.message ||
        "Unable to update job."
      );
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search
      .toLowerCase()
      .trim();

    if (!searchText) {
      return true;
    }

    return (
      job.title
        .toLowerCase()
        .includes(searchText) ||
      job.company
        .toLowerCase()
        .includes(searchText) ||
      job.location
        .toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <main className="manage-jobs-page">

      <div className="page-container">

        <div className="manage-jobs-header">

          <div>
            <Link
              to="/admin"
              className="admin-back-link"
            >
              ← Back to Dashboard
            </Link>

            <h1>Manage Jobs</h1>

            <p>
              View and manage all jobs posted
              on CodeWithShiva Jobs.
            </p>
          </div>

          <Link
            to="/admin/post-job"
            className="publish-job-btn"
          >
            + Post New Job
          </Link>

        </div>


        <div className="manage-jobs-search">

          <input
            type="text"
            placeholder="Search by job title, company or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {loading && (
          <div className="jobs-message">
            <h3>Loading jobs...</h3>
          </div>
        )}


        {!loading && error && (
          <div className="jobs-message jobs-error">
            <h3>Unable to load jobs</h3>
            <p>{error}</p>
          </div>
        )}


        {!loading &&
          !error &&
          filteredJobs.length === 0 && (
            <div className="jobs-message">
              <h3>No jobs found</h3>
              <p>
                There are no jobs matching
                your search.
              </p>
            </div>
          )}


        {!loading &&
          !error &&
          filteredJobs.length > 0 && (

            <div className="manage-jobs-table-wrapper">

              <table className="manage-jobs-table">

                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredJobs.map((job) => (

                    <tr key={job.id}>

                      <td>
                        <div className="manage-job-title">
                          <strong>
                            {job.title}
                          </strong>

                          <span>
                            {job.company}
                          </span>
                        </div>
                      </td>

                      <td>
                        {job.location}
                      </td>

                      <td>
                        {job.type}
                      </td>

                      <td>

                        <span
                          className={
                            job.is_published
                              ? "job-status published"
                              : "job-status unpublished"
                          }
                        >
                          {job.is_published
                            ? "Published"
                            : "Unpublished"}
                        </span>

                      </td>

                      <td>

                        <div className="job-actions">

                          <button
                            className="action-btn"
                            onClick={() =>
                              handleTogglePublished(
                                job
                              )
                            }
                          >
                            {job.is_published
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <Link
                            to={`/admin/edit-job/${job.id}`}
                            className="action-btn edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="action-btn delete-btn"
                            onClick={() =>
                              handleDelete(job)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </main>
  );
}

export default ManageJobs;