import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteResume, getResumes } from "../../services/resumeService";

function Resumes() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      setLoading(true);
      setError("");

      const data = await getResumes();
      setResumes(data);
    } catch (err) {
      setError(err.message || "Unable to load resumes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(resumeId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(resumeId);
      setError("");

      await deleteResume(resumeId);

      setResumes((currentResumes) =>
        currentResumes.filter((resume) => resume.id !== resumeId)
      );
    } catch (err) {
      setError(err.message || "Unable to delete resume.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="resumes-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Resumes</h1>

          <p className="page-subtitle">
            Manage your resumes and analyze them with CareerAI.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/resumes/new")}
        >
          + Add Resume
        </button>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="content-card">
          <p>Loading resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No resumes yet</h2>

          <p>
            Upload your first resume to start analyzing your
            career profile with CareerAI.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/resumes/new")}
          >
            + Add Resume
          </button>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div className="content-card resume-card" key={resume.id}>
              <div className="resume-card-header">
                <div className="resume-type-badge">
                  CV
                </div>
              </div>

              <h2>
                {resume.file_name || "Untitled Resume"}
              </h2>

              <p>
                Uploaded{" "}
                {resume.created_at
                  ? new Date(
                      resume.created_at
                    ).toLocaleDateString()
                  : "Unknown date"}
              </p>

              <div className="resume-card-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    navigate(`/resumes/${resume.id}`)
                  }
                >
                  View Resume
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(resume.id)}
                  disabled={deletingId === resume.id}
                >
                  {deletingId === resume.id
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

export default Resumes;
