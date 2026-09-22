import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResume,
  analyzeResumeWithAI,
} from "../../services/resumeService";

function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadResume();
  }, [id]);

  async function loadResume() {
    try {
      setLoading(true);
      setError("");

      const data = await getResume(id);
      setResume(data);
    } catch (err) {
      setError(err.message || "Unable to load resume.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyze() {
    try {
      setAnalyzing(true);
      setError("");

      const result = await analyzeResumeWithAI(id);
      setAnalysis(result);
    } catch (err) {
      setError(err.message || "Unable to analyze resume.");
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
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

            <h1 className="page-title">
              Resume Details
            </h1>

            <p className="page-subtitle">
              Loading resume...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
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

            <h1 className="page-title">
              Resume Details
            </h1>

            <p className="page-subtitle">
              Unable to load this resume.
            </p>
          </div>
        </div>

        {error && (
          <div className="content-card">
            <p className="error-message">{error}</p>
          </div>
        )}
      </div>
    );
  }

  function formatDate(value) {
    if (!value) {
      return "Unknown date";
    }

    return new Date(value).toLocaleDateString();
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

          <h1 className="page-title">
            Resume Details
          </h1>

          <p className="page-subtitle">
            Review and analyze your resume with CareerAI.
          </p>
        </div>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <div>
            <h2>Resume Information</h2>

            <p>
              Details about your uploaded resume.
            </p>
          </div>
        </div>

        <div className="resume-details">
          <div>
            <strong>File Name</strong>
            <p>{resume.file_name}</p>
          </div>

          <div>
            <strong>Resume ID</strong>
            <p>{resume.id}</p>
          </div>

          <div>
            <strong>Uploaded</strong>
            <p>{formatDate(resume.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div>
            <h2>Resume Content</h2>

            <p>
              Information extracted from your uploaded resume.
            </p>
          </div>
        </div>

        <div className="resume-content">
          {resume.extracted_text ? (
            <pre>{resume.extracted_text}</pre>
          ) : (
            <p>No extracted resume content available.</p>
          )}
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div>
            <h2>AI Resume Analysis</h2>

            <p>
              Use CareerAI to analyze your resume and identify
              career insights.
            </p>
          </div>
        </div>

        {!analysis && !analyzing && (
          <div className="analysis-empty">
            <h3>Ready to analyze your resume?</h3>

            <p>
              CareerAI can analyze the information extracted
              from your resume.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={handleAnalyze}
            >
              Analyze Resume with AI
            </button>
          </div>
        )}

        {analyzing && (
          <div className="analysis-empty">
            <h3>Analyzing...</h3>

            <p>
              CareerAI is analyzing your resume. Please wait.
            </p>
          </div>
        )}

        {analysis && !analyzing && (
          <div className="resume-analysis">
            <div className="analysis-section">
              <h3>Summary</h3>

              <p>
                {analysis.summary || "Not specified"}
              </p>
            </div>

            <div className="analysis-section">
              <h3>Skills</h3>

              <p>
                {analysis.skills || "Not specified"}
              </p>
            </div>

            <div className="analysis-section">
              <h3>Experience</h3>

              <p className="analysis-text">
                {analysis.experience || "Not specified"}
              </p>
            </div>

            <div className="analysis-section">
              <h3>Education</h3>

              <p className="analysis-text">
                {analysis.education || "Not specified"}
              </p>
            </div>

            <div className="analysis-section">
              <h3>Certifications</h3>

              <p>
                {analysis.certifications || "Not specified"}
              </p>
            </div>

            <div className="analysis-section">
              <h3>Keywords</h3>

              <p>
                {analysis.keywords || "Not specified"}
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={handleAnalyze}
            >
              Analyze Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeDetails;

