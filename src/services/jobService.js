import { supabase } from "../lib/supabaseClient";

/* =====================================================
   GET PUBLISHED JOBS
===================================================== */

export async function getPublishedJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

/* =====================================================
   GET ALL JOBS
===================================================== */

export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

/* =====================================================
   GET JOB BY ID
===================================================== */

export async function getJobById(id) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* =====================================================
   CREATE JOB
===================================================== */

export async function createJob(jobData) {
  const applicationLink =
    jobData.apply_url?.trim() || "";

  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        title: jobData.title,

        company: jobData.company,

        location: jobData.location,

        /* Existing required database column */
        type: jobData.job_type,

        /* Keep this if your table contains it */
        job_type: jobData.job_type,

        experience:
          jobData.experience,

        salary:
          jobData.salary,

        category:
          jobData.category,

        /* TEXT[] */
        skills:
          jobData.skills,

        description:
          jobData.description,

        /* TEXT[] */
        responsibilities:
          jobData.responsibilities,

        /* TEXT[] */
        requirements:
          jobData.requirements,

        /*
         * Existing required database column.
         */
        apply_link:
          applicationLink,

        /*
         * Keep apply_url synchronized
         * if this column exists.
         */
        apply_url:
          applicationLink,

        is_published:
          jobData.is_published,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* =====================================================
   UPDATE JOB
===================================================== */

export async function updateJob(
  id,
  jobData
) {
  const applicationLink =
    jobData.apply_url?.trim() || "";

  const { data, error } = await supabase
    .from("jobs")
    .update({
      title:
        jobData.title,

      company:
        jobData.company,

      location:
        jobData.location,

      /* Existing required database column */
      type:
        jobData.job_type,

      /* Keep synchronized */
      job_type:
        jobData.job_type,

      experience:
        jobData.experience,

      salary:
        jobData.salary,

      category:
        jobData.category,

      /* TEXT[] */
      skills:
        jobData.skills,

      description:
        jobData.description,

      /* TEXT[] */
      responsibilities:
        jobData.responsibilities,

      /* TEXT[] */
      requirements:
        jobData.requirements,

      /*
       * Existing required database column.
       */
      apply_link:
        applicationLink,

      /*
       * Keep synchronized.
       */
      apply_url:
        applicationLink,

      is_published:
        jobData.is_published,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* =====================================================
   DELETE JOB
===================================================== */

export async function deleteJob(id) {
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}

/* =====================================================
   TOGGLE PUBLISHED STATUS
===================================================== */

export async function toggleJobPublished(
  id,
  currentStatus
) {
  const newStatus =
    !currentStatus;

  const { data, error } = await supabase
    .from("jobs")
    .update({
      is_published:
        newStatus,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* =====================================================
   UPDATE PUBLISHED STATUS
===================================================== */

export async function updateJobPublishStatus(
  id,
  isPublished
) {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      is_published:
        isPublished,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}