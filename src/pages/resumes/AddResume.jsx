import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../../services/resumeService";

function AddResume() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      setError("Please select a PDF, DOC, or DOCX file.");
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const resume = await uploadResume(file);
      navigate(`/resumes/${resume.id}`);
    } catch (err) {
      setError(err.message || "Unable to upload resume.");
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
            onClick={() => navigate("/resumes")}
          >
            ← Back to Resumes
          </button>

          <h1 className="page-title">Add Resume</h1>

          <p className="page-subtitle">
            Upload your resume to analyze your career profile
          </p>
        </div>
      </div>

      <div className="content-card add-resume-card">
        <div className="card-header">
          <div>
            <h2>Upload Resume</h2>

            <p>
              Select your current resume in PDF, DOC, or DOCX format.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="resume-upload-area">
            <div className="resume-upload-icon">
              ↑
            </div>

            <h3>
              {file ? file.name : "Choose your resume"}
            </h3>

            <p>
              {file
                ? "File selected and ready to upload."
                : "PDF, DOC, or DOCX files are supported."}
            </p>

            <button
              type="button"
              className="secondary-button upload-file-button"
              onClick={handleChooseFile}
              disabled={loading}
            >
              {file ? "Change File" : "Choose File"}
            </button>

            <input
              ref={fileInputRef}
              id="resume-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                opacity: 0,
              }}
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
              onClick={() => navigate("/resumes")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading || !file}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddResume;
