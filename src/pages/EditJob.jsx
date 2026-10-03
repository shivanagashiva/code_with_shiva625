import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getJobById,
  updateJob,
} from "../services/jobService";

import "./PostJob.css";

const initialForm = {
  title: "",
  company: "",
  location: "",
  job_type: "Full Time",
  experience: "",
  salary: "",
  category: "",
  skills: "",
  description: "",
  responsibilities: "",
  requirements: "",
  apply_url: "",
  is_published: true,
};

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /* =========================
     LOAD JOB
  ========================= */

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const job =
        await getJobById(id);

      if (!job) {
        alert("Job not found.");

        navigate(
          "/admin/manage-jobs"
        );

        return;
      }

      /*
       * Convert Supabase arrays
       * back into text for the form.
       */

      const skillsText =
        Array.isArray(job.skills)
          ? job.skills.join(", ")
          : job.skills || "";

      const responsibilitiesText =
        Array.isArray(
          job.responsibilities
        )
          ? job.responsibilities.join(
              "\n"
            )
          : job.responsibilities || "";

      const requirementsText =
        Array.isArray(
          job.requirements
        )
          ? job.requirements.join(
              "\n"
            )
          : job.requirements || "";

      setFormData({
        title:
          job.title || "",

        company:
          job.company || "",

        location:
          job.location || "",

        job_type:
          job.job_type ||
          job.type ||
          "Full Time",

        experience:
          job.experience || "",

        salary:
          job.salary || "",

        category:
          job.category || "",

        skills:
          skillsText,

        description:
          job.description || "",

        responsibilities:
          responsibilitiesText,

        requirements:
          requirementsText,

        apply_url:
          job.apply_url ||
          job.application_url ||
          "",

        is_published:
          job.is_published ??
          true,
      });

    } catch (error) {
      console.error(
        "Load job error:",
        error
      );

      alert(
        error?.message ||
          "Unable to load the job."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================
     CONVERT TEXT TO ARRAY
  ========================= */

  const convertToArray = (text) => {
    return String(text || "")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const convertSkillsToArray = (text) => {
    return String(text || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  /* =========================
     SAVE
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert(
        "Please enter the job title."
      );
      return;
    }

    if (!formData.company.trim()) {
      alert(
        "Please enter the company name."
      );
      return;
    }

    if (!formData.location.trim()) {
      alert(
        "Please enter the location."
      );
      return;
    }

    if (!formData.category.trim()) {
      alert(
        "Please select a category."
      );
      return;
    }

    if (!formData.apply_url.trim()) {
      alert(
        "Please enter the external application link."
      );
      return;
    }

    try {
      setSaving(true);

      const skillsArray =
        convertSkillsToArray(
          formData.skills
        );

      const responsibilitiesArray =
        convertToArray(
          formData.responsibilities
        );

      const requirementsArray =
        convertToArray(
          formData.requirements
        );

      const jobData = {
        title:
          formData.title.trim(),

        company:
          formData.company.trim(),

        location:
          formData.location.trim(),

        job_type:
          formData.job_type,

        experience:
          formData.experience.trim(),

        salary:
          formData.salary.trim(),

        category:
          formData.category.trim(),

        skills:
          skillsArray,

        description:
          formData.description.trim(),

        responsibilities:
          responsibilitiesArray,

        requirements:
          requirementsArray,

        apply_url:
          formData.apply_url.trim(),

        is_published:
          formData.is_published,
      };

      console.log(
        "Updating job:",
        jobData
      );

      await updateJob(
        id,
        jobData
      );

      alert(
        "Job updated successfully! 🎉"
      );

      navigate(
        "/admin/manage-jobs"
      );

    } catch (error) {
      console.error(
        "Update job error:",
        error
      );

      alert(
        error?.message ||
          "Unable to update the job."
      );

    } finally {
      setSaving(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="post-job-page">

        <div className="post-job-container">

          <div className="post-job-header">

            <h1>
              Loading Job...
            </h1>

            <p>
              Please wait while the job
              details are loaded.
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="post-job-page">

      <div className="post-job-container">

        {/* HEADER */}

        <div className="post-job-header">

          <h1>
            Edit Job
          </h1>

          <p>
            Update the job details and
            application information.
          </p>

        </div>

        <form
          className="post-job-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <section className="form-section">

            <h2>
              Basic Information
            </h2>

            <div className="form-grid">

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Job Title{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* COMPANY */}

              <div className="form-group">

                <label>
                  Company{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* JOB TYPE */}

              <div className="form-group">

                <label>
                  Job Type{" "}
                  <span>*</span>
                </label>

                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  required
                >

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

              </div>

              {/* EXPERIENCE */}

              <div className="form-group">

                <label>
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                  placeholder="Fresher / 0-2 Years"
                />

              </div>

              {/* SALARY */}

              <div className="form-group">

                <label>
                  Salary
                </label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="6-12 LPA"
                />

              </div>

              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Category{" "}
                  <span>*</span>
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
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

              </div>

            </div>

          </section>

          {/* =========================
              SKILLS
          ========================= */}

          <section className="form-section">

            <h2>
              Skills
            </h2>

            <div className="form-group">

              <label>
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Java, Spring Boot, SQL, React"
              />

              <small>
                Separate skills using commas.
              </small>

            </div>

          </section>

          {/* =========================
              DESCRIPTION
          ========================= */}

          <section className="form-section">

            <h2>
              Job Description
            </h2>

            <div className="form-group">

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
                rows="6"
                placeholder="Enter the complete job description..."
              />

            </div>

          </section>

          {/* =========================
              RESPONSIBILITIES
          ========================= */}

          <section className="form-section">

            <h2>
              Responsibilities
            </h2>

            <div className="form-group">

              <textarea
                name="responsibilities"
                value={
                  formData.responsibilities
                }
                onChange={handleChange}
                rows="7"
                placeholder={`Develop Java applications
Build REST APIs
Work with SQL databases
Fix bugs`}
              />

              <small>
                Put each responsibility on
                a separate line.
              </small>

            </div>

          </section>

          {/* =========================
              REQUIREMENTS
          ========================= */}

          <section className="form-section">

            <h2>
              Requirements
            </h2>

            <div className="form-group">

              <textarea
                name="requirements"
                value={
                  formData.requirements
                }
                onChange={handleChange}
                rows="7"
                placeholder={`B.Tech / B.E.
Good knowledge of Java
Knowledge of SQL
Good communication`}
              />

              <small>
                Put each requirement on a
                separate line.
              </small>

            </div>

          </section>

          {/* =========================
              APPLICATION
          ========================= */}

          <section className="form-section">

            <h2>
              Application
            </h2>

            <div className="form-group">

              <label>
                External Application Link{" "}
                <span>*</span>
              </label>

              <input
                type="url"
                name="apply_url"
                value={
                  formData.apply_url
                }
                onChange={handleChange}
                placeholder="https://careers.company.com/job/123"
                required
              />

              <small>
                Candidates will be redirected
                to this external website when
                they click Apply Now.
              </small>

            </div>

          </section>

          {/* =========================
              PUBLISH
          ========================= */}

          <div className="publish-option">

            <label>

              <input
                type="checkbox"
                name="is_published"
                checked={
                  formData.is_published
                }
                onChange={handleChange}
              />

              <span>
                Publish this job
              </span>

            </label>

          </div>

          {/* ACTIONS */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(
                  "/admin/manage-jobs"
                )
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Update Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditJob;