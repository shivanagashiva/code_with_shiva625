 import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import JobCard from "../components/JobCard";
import { getPublishedJobs } from "../services/jobService";

import "./Jobs.css";

function Jobs() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     FILTER VALUES
  ===================================================== */

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [jobType, setJobType] = useState("");
  const [experience, setExperience] =
    useState("");
  const [category, setCategory] =
    useState("");

  /* =====================================================
     LOAD JOBS
  ===================================================== */

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getPublishedJobs();

      setJobs(data || []);

    } catch (err) {
      console.error(
        "Failed to load jobs:",
        err
      );

      setError(
        "Unable to load jobs. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     SYNC URL SEARCH
  ===================================================== */

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );

    setLocation(
      searchParams.get("location") || ""
    );
  }, [searchParams]);

  /* =====================================================
     FILTER JOBS
  ===================================================== */

  const filteredJobs = useMemo(() => {
    const searchText =
      search
        .trim()
        .toLowerCase();

    const locationText =
      location
        .trim()
        .toLowerCase();

    return jobs.filter((job) => {

      /* -------------------------
         SEARCH
      ------------------------- */

      const title =
        String(
          job.title || ""
        ).toLowerCase();

      const company =
        String(
          job.company || ""
        ).toLowerCase();

      const categoryText =
        String(
          job.category || ""
        ).toLowerCase();

      const description =
        String(
          job.description || ""
        ).toLowerCase();

      const skillsArray =
        Array.isArray(job.skills)
          ? job.skills
          : [];

      const skillsText =
        skillsArray
          .join(" ")
          .toLowerCase();

      const experienceText =
        String(
          job.experience || ""
        ).toLowerCase();

      const searchMatch =
        !searchText ||
        title.includes(searchText) ||
        company.includes(searchText) ||
        categoryText.includes(searchText) ||
        description.includes(searchText) ||
        skillsText.includes(searchText) ||
        experienceText.includes(searchText);

      /* -------------------------
         LOCATION
      ------------------------- */

      const jobLocation =
        String(
          job.location || ""
        ).toLowerCase();

      const locationMatch =
        !locationText ||
        jobLocation.includes(
          locationText
        );

      /* -------------------------
         JOB TYPE
      ------------------------- */

      const currentJobType =
        String(
          job.type ||
            job.job_type ||
            ""
        ).toLowerCase();

      const jobTypeMatch =
        !jobType ||
        currentJobType ===
          jobType.toLowerCase();

      /* -------------------------
         EXPERIENCE
      ------------------------- */

      const currentExperience =
        String(
          job.experience || ""
        ).toLowerCase();

      const experienceMatch =
        !experience ||
        currentExperience.includes(
          experience.toLowerCase()
        );

      /* -------------------------
         CATEGORY
      ------------------------- */

      const currentCategory =
        String(
          job.category || ""
        ).toLowerCase();

      const categoryMatch =
        !category ||
        currentCategory ===
          category.toLowerCase();

      return (
        searchMatch &&
        locationMatch &&
        jobTypeMatch &&
        experienceMatch &&
        categoryMatch
      );
    });
  }, [
    jobs,
    search,
    location,
    jobType,
    experience,
    category,
  ]);

  /* =====================================================
     SEARCH SUBMIT
  ===================================================== */

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set(
        "search",
        search.trim()
      );
    }

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    setSearchParams(params);
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setExperience("");
    setCategory("");

    setSearchParams({});
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="jobs-page">

        <div className="jobs-loading">
          Loading jobs...
        </div>

      </div>
    );
  }

  return (
    <div className="jobs-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="jobs-header">

      </section>

      {/* =================================================
          SEARCH / FILTERS
      ================================================= */}

      <section className="jobs-content">

        <div className="jobs-filter-box">

          <form
            className="jobs-search-form"
            onSubmit={handleSearch}
          >

            <div className="jobs-search-field">

              <span>
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search jobs, skills or companies"
              />

            </div>

            <div className="jobs-search-field">

              <span>
                📍
              </span>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                placeholder="Location"
              />

            </div>

            <button
              type="submit"
              className="jobs-search-button"
            >
              Search Jobs
            </button>

          </form>

          {/* FILTERS */}

          <div className="jobs-filter-row">

            <select
              value={jobType}
              onChange={(e) =>
                setJobType(
                  e.target.value
                )
              }
            >

              <option value="">
                All Job Types
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Remote">
                Remote
              </option>

            </select>

            <select
              value={experience}
              onChange={(e) =>
                setExperience(
                  e.target.value
                )
              }
            >

              <option value="">
                All Experience
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="0-1">
                0-1 Years
              </option>

              <option value="1-3">
                1-3 Years
              </option>

              <option value="3-5">
                3-5 Years
              </option>

            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option value="">
                All Categories
              </option>

              <option value="Software Development">
                Software Development
              </option>

              <option value="Full Stack Development">
                Full Stack Development
              </option>

              <option value="Java">
                Java
              </option>

              <option value="Python">
                Python
              </option>

              <option value="React">
                React
              </option>

              <option value="Cloud">
                Cloud
              </option>

              <option value="AI / ML">
                AI / ML
              </option>

              <option value="Data & SQL">
                Data & SQL
              </option>

              <option value="Internships">
                Internships
              </option>

            </select>

            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="jobs-results-header">

          <div>

            <h2>
              {search ||
              location ||
              jobType ||
              experience ||
              category
                ? "Search Results"
                : "Latest Jobs"}
            </h2>

            <p>
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "job"
                : "jobs"} found
            </p>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="jobs-message error">
            {error}
          </div>
        )}

        {/* NO RESULTS */}

        {!error &&
          filteredJobs.length === 0 && (
            <div className="jobs-message">

              <div className="no-jobs-icon">
                🔎
              </div>

              <h3>
                No jobs found
              </h3>

              <p>
                Try another job title,
                skill, company or location.
              </p>

              <button
                onClick={clearFilters}
                className="clear-results-button"
              >
                Clear Search
              </button>

            </div>
          )}

        {/* JOBS */}

        {filteredJobs.length > 0 && (
          <div className="jobs-list">

            {filteredJobs.map(
              (job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
}

export default Jobs;