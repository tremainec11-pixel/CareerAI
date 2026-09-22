import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteInterview,
  getInterviews,
} from "../services/interviewService";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInterviews() {
      try {
        const data = await getInterviews();
        setInterviews(data);
      } catch (err) {
        setError(
          err.message || "Unable to load your interviews."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInterviews();
  }, []);

  function formatDate(value) {
    if (!value) {
      return "Unknown date";
    }

    return new Date(value).toLocaleString();
  }

  async function handleDelete(interviewId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(interviewId);
      setError("");

      await deleteInterview(interviewId);

      setInterviews((currentInterviews) =>
        currentInterviews.filter(
          (interview) => interview.id !== interviewId
        )
      );
    } catch (err) {
      setError(
        err.message || "Unable to delete the interview."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">Interviews</h1>

        <p className="page-subtitle">
          Loading your interviews...
        </p>
      </div>
    );
  }

  return (
    <div className="interviews-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Interviews</h1>

          <p className="page-subtitle">
            Track and manage your upcoming interviews.
          </p>
        </div>

        <Link
          to="/applications"
          className="primary-button"
        >
          View Applications
        </Link>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      {interviews.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No interviews yet</h2>

          <p>
            Schedule an interview for one of your job
            applications to start tracking it with CareerAI.
          </p>

          <Link
            to="/applications"
            className="primary-button"
          >
            View Applications
          </Link>
        </div>
      ) : (
        <div className="applications-grid">
          {interviews.map((interview) => (
            <div
              className="job-card"
              key={interview.id}
            >
              <div className="job-card-header">
                <div>
                  <h2>{interview.job_title}</h2>

                  <p>{interview.company_name}</p>
                </div>
              </div>

              <p className="job-location">
                Date: {formatDate(interview.interview_date)}
              </p>

              <p className="job-location">
                Type: {interview.interview_type}
              </p>

              <p className="job-location">
                Status: {interview.status}
              </p>

              {interview.notes && (
                <p className="job-location">
                  Notes: {interview.notes}
                </p>
              )}

              <div className="application-actions">
                <Link
                  to={`/interviews/${interview.id}/edit`}
                  className="secondary-button"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    handleDelete(interview.id)
                  }
                  disabled={deletingId === interview.id}
                >
                  {deletingId === interview.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Interviews;

