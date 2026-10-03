import { useParams } from "react-router-dom";

function JobApplication() {
  const { id } = useParams();

  return (
    <div className="page-container">
      <h1>Job Application</h1>

      <p>Application for Job ID: {id}</p>

      <p>
        The job application form will be available soon.
      </p>
    </div>
  );
}

export default JobApplication;