import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  getInterview,
  updateInterview,
} from "../services/interviewService";

function EditInterview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    application_id: null,
    interview_date: "",
    interview_type: "Video",
    status: "Scheduled",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInterview() {
      try {
        const data = await getInterview(id);

        const date = new Date(data.interview_date);

        const localDateTime = new Date(
          date.getTime() -
            date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        setFormData({
          application_id: data.application_id,
          interview_date: localDateTime,
          interview_type: data.interview_type,
          status: data.status,
          notes: data.notes || "",
        });
      } catch (err) {
        setError(
          err.message || "Unable to load the interview."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInterview();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.interview_date) {
      setError("Please select a date and time.");
      return;
    }

    if (!formData.application_id) {
      setError("Application ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateInterview(id, {
        application_id: formData.application_id,
        interview_date: new Date(
          formData.interview_date
        ).toISOString(),
        interview_type: formData.interview_type,
        status: formData.status,
        notes: formData.notes || null,
      });

      navigate("/interviews");
    } catch (err) {
      setError(
        err.message || "Unable to update the interview."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">
          Edit Interview
        </h1>

        <p className="page-subtitle">
          Loading interview...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Edit Interview
          </h1>

          <p className="page-subtitle">
            Update the details of your interview.
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
              <option value="In-person">
                In-person
              </option>
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
              <option value="Scheduled">
                Scheduled
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Cancelled">
                Cancelled
              </option>
              <option value="Rescheduled">
                Rescheduled
              </option>
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
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/interviews")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInterview;

