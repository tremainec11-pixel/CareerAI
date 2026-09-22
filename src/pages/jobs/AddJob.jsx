import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    location: "",
    url: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const job = await createJob(formData);

      navigate(`/jobs/${job.id}`);
    } catch (err) {
      setError(err.message || "Unable to create job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <button
            type="button"
            className="back-link back-button"
            onClick={() => navigate("/jobs")}
          >
            ← Back to Jobs
          </button>

          <h1 className="page-title">Add Job</h1>

          <p className="page-subtitle">
            Add a new career opportunity to your CareerAI workspace.
          </p>
        </div>
      </div>

      <div className="content-card add-job-card">
        <div className="card-header">
          <div>
            <h2>Job Information</h2>

            <p>
              Enter the details from the job posting.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Job Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="e.g. Full Stack Developer"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company_name">
              Company
            </label>

            <input
              id="company_name"
              name="company_name"
              type="text"
              className="form-input"
              placeholder="e.g. Microsoft"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              className="form-input"
              placeholder="e.g. Remote / Mexico City"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="url">
              Job Posting URL
            </label>

            <input
              id="url"
              name="url"
              type="url"
              className="form-input"
              placeholder="https://..."
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Job Description
            </label>

            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Paste the job description here..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/jobs")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Creating Job..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJob;