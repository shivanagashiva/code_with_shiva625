import { jobs as defaultJobs } from "./jobs";

const STORAGE_KEY = "codewithshiva_jobs";

export const getJobs = () => {
  const savedJobs = localStorage.getItem(STORAGE_KEY);

  if (!savedJobs) {
    return defaultJobs;
  }

  try {
    return JSON.parse(savedJobs);
  } catch (error) {
    console.error("Unable to load jobs:", error);
    return defaultJobs;
  }
};

export const saveJobs = (jobs) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(jobs)
  );
};

export const addJob = (job) => {
  const currentJobs = getJobs();

  const newJob = {
    ...job,
    id: Date.now(),
    posted: "Just now",
    featured: false,
  };

  const updatedJobs = [
    newJob,
    ...currentJobs,
  ];

  saveJobs(updatedJobs);

  return newJob;
};

export const getJobById = (id) => {
  const currentJobs = getJobs();

  return currentJobs.find(
    (job) => job.id === Number(id)
  );
};