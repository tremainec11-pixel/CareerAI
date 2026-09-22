import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Unable to load jobs.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">Jobs</h1>
        <p className="page-subtitle">Loading your jobs...</p>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="page-header jobs-page-header">
        <div>
          <h1 className="page-title">Jobs</h1>

          <p className="page-subtitle">
            Manage and analyze your career opportunities.
          </p>
        </div>

        <Link to="/jobs/new" className="primary-button">
          + Add Job
        </Link>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No jobs yet</h2>

          <p>
            Create your first job to start analyzing opportunities
            with CareerAI.
          </p>

          <Link to="/jobs/new" className="primary-button">
            Create Job
          </Link>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-card-header">
                <div>
                  <h2>{job.title}</h2>
                  <p>{job.company_name}</p>
                </div>
              </div>

              {job.location && (
                <p className="job-location">
                  {job.location}
                </p>
              )}

              <Link
                to={`/jobs/${job.id}`}
                className="secondary-button"
              >
                View Job
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
