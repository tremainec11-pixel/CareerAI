import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getApplications,
  updateApplication,
} from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        setError(
          err.message || "Unable to load your applications."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  function formatDate(value) {
    if (!value) {
      return "Unknown date";
    }

    return new Date(value).toLocaleDateString();
  }

  async function handleStatusChange(application, newStatus) {
    try {
      setUpdatingId(application.id);
      setError("");

      const updatedApplication = await updateApplication(
        application.id,
        {
          job_id: application.job_id,
          status: newStatus,
          notes: application.notes,
        }
      );

      setApplications((currentApplications) =>
        currentApplications.map((item) =>
          item.id === application.id
            ? updatedApplication
            : item
        )
      );
    } catch (err) {
      setError(
        err.message || "Unable to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">Applications</h1>

        <p className="page-subtitle">
          Loading your applications...
        </p>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="page-header applications-page-header">
        <div>
          <h1 className="page-title">Applications</h1>

          <p className="page-subtitle">
            Track and manage your job applications.
          </p>
        </div>

        <Link to="/jobs" className="primary-button">
          + Apply to a Job
        </Link>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No applications yet</h2>

          <p>
            Apply to a job to start tracking your applications
            with CareerAI.
          </p>

          <Link to="/jobs" className="primary-button">
            View Jobs
          </Link>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((application) => (
            <div
              className="job-card"
              key={application.id}
            >
              <div className="job-card-header">
                <div>
                  <h2>{application.job_title}</h2>

                  <p>{application.company_name}</p>
                </div>
              </div>

              {application.location && (
                <p className="job-location">
                  {application.location}
                </p>
              )}

              <div>
                <label className="job-location">
                  Status
                </label>

                <select
                  value={application.status}
                  onChange={(event) =>
                    handleStatusChange(
                      application,
                      event.target.value
                    )
                  }
                  disabled={updatingId === application.id}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>

              <p className="job-location">
                Applied: {formatDate(application.applied_at)}
              </p>

              {application.notes && (
                <p className="job-location">
                  Notes: {application.notes}
                </p>
              )}

              <div className="application-actions">
                <Link
                  to={`/interviews/new?applicationId=${application.id}`}
                  className="primary-button"
                >
                  Schedule Interview
                </Link>

                <Link
                  to={`/jobs/${application.job_id}`}
                  className="secondary-button"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;