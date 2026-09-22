import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createInterview } from "../services/interviewService";

function NewInterview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const applicationId = searchParams.get("applicationId");

  const [formData, setFormData] = useState({
    interview_date: "",
    interview_type: "Video",
    status: "Scheduled",
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!applicationId) {
      setError("Application ID is missing.");
      return;
    }

    if (!formData.interview_date) {
      setError("Please select a date and time.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createInterview({
        application_id: Number(applicationId),
        interview_date: formData.interview_date,
        interview_type: formData.interview_type,
        status: formData.status,
        notes: formData.notes || null,
      });

      navigate("/interviews");
    } catch (err) {
      setError(
        err.message || "Unable to schedule the interview."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Schedule Interview</h1>

          <p className="page-subtitle">
            Add an interview for this job application.
          </p>
        </div>
      </div>

      <div className="content-card">
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="job-location">
              Date & Time
            </label>

            <input
              type="datetime-local"
              name="interview_date"
              value={formData.interview_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="job-location">
              Interview Type
            </label>

            <select
              name="interview_type"
              value={formData.interview_type}
              onChange={handleChange}
            >
              <option value="Phone">Phone</option>
              <option value="Video">Video</option>
              <option value="In-person">In-person</option>
            </select>
          </div>

          <div>
            <label className="job-location">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>

          <div>
            <label className="job-location">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Add interview notes..."
            />
          </div>

          <div className="application-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Scheduling..."
                : "Schedule Interview"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/applications")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewInterview;
