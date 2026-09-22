import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getJob,
  analyzeJob,
  analyzeJobWithAI,
} from "../../services/jobService";
import {
  getApplications,
  createApplication,
} from "../../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [applying, setApplying] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true);
        setError("");

        const [jobData, applications] = await Promise.all([
          getJob(id),
          getApplications(),
        ]);

        setJob(jobData);

        if (jobData.analysis) {
          setAnalysis(jobData.analysis);
        }

        const existingApplication = applications.find(
          (item) => item.job_id === Number(id)
        );

        if (existingApplication) {
          setApplication(existingApplication);
        }
      } catch (err) {
        setError(err.message || "Unable to load job.");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  async function handleApply() {
    try {
      setApplying(true);
      setError("");

      const data = await createApplication({
        job_id: Number(id),
        status: "Applied",
        notes: null,
      });

      setApplication(data);
    } catch (err) {
      setError(
        err.message || "Unable to create application."
      );
    } finally {
      setApplying(false);
    }
  }

  async function handleAnalyze() {
    try {
      setAnalyzing(true);
      setError("");

      const data = await analyzeJob(id);
      setAnalysis(data);
    } catch (err) {
      setError(err.message || "Unable to analyze job.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleAIAnalysis() {
    try {
      setAiAnalyzing(true);
      setError("");

      const data = await analyzeJobWithAI(id);
      setAnalysis(data);
    } catch (err) {
      setError(
        err.message || "Unable to analyze job with AI."
      );
    } finally {
      setAiAnalyzing(false);
    }
  }

  function formatTags(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">Job Details</h1>

        <p className="page-subtitle">
          Loading job information...
        </p>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Job Details</h1>
        </div>

        <div className="content-card">
          <p className="error-message">{error}</p>

          <Link to="/jobs" className="secondary-button">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const requiredSkills = formatTags(
    analysis?.required_skills
  );

  const keywords = formatTags(
    analysis?.keywords
  );

  return (
    <div>
      <div className="page-header job-details-header">
        <div>
          <Link to="/jobs" className="back-link">
            ← Back to Jobs
          </Link>

          <h1 className="page-title">
            {job.title}
          </h1>

          <p className="page-subtitle">
            {job.company_name}
            {job.location ? ` · ${job.location}` : ""}
          </p>
        </div>
      </div>

      {error && (
        <div className="content-card">
          <p className="error-message">{error}</p>
        </div>
      )}

      <div className="job-details-grid">
        <div className="content-card job-info-card">
          <div className="card-header">
            <div>
              <h2>Job Information</h2>

              <p>
                Details about this career opportunity.
              </p>
            </div>
          </div>

          <div className="job-info-list">
            <div className="job-info-item">
              <span className="job-info-label">
                Job Title
              </span>

              <span className="job-info-value">
                {job.title}
              </span>
            </div>

            <div className="job-info-item">
              <span className="job-info-label">
                Company
              </span>

              <span className="job-info-value">
                {job.company_name}
              </span>
            </div>

            {job.location && (
              <div className="job-info-item">
                <span className="job-info-label">
                  Location
                </span>

                <span className="job-info-value">
                  {job.location}
                </span>
              </div>
            )}

            {job.url && (
              <div className="job-info-item">
                <span className="job-info-label">
                  Job Posting
                </span>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Open Job Posting →
                </a>
              </div>
            )}
          </div>

          {job.description && (
            <div className="job-description">
              <h3>Job Description</h3>

              <p>{job.description}</p>
            </div>
          )}

          <div className="job-application-action">
            {application ? (
              <button
                type="button"
                className="secondary-button"
                disabled
              >
                Applied
              </button>
            ) : (
              <button
                type="button"
                className="primary-button"
                onClick={handleApply}
                disabled={applying}
              >
                {applying
                  ? "Applying..."
                  : "Apply to Job"}
              </button>
            )}
          </div>
        </div>

        <div className="content-card analysis-card">
          <div className="card-header">
            <div>
              <h2>AI Analysis</h2>

              <p>
                Analyze this opportunity with CareerAI.
              </p>
            </div>

            {analysis && (
              <span className="analysis-status-badge">
                AI Ready
              </span>
            )}
          </div>

          <div className="analysis-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleAnalyze}
              disabled={analyzing || aiAnalyzing}
            >
              {analyzing
                ? "Analyzing..."
                : "Analyze Job"}
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleAIAnalysis}
              disabled={analyzing || aiAnalyzing}
            >
              {aiAnalyzing
                ? "AI Analyzing..."
                : "Analyze with AI"}
            </button>
          </div>

          {analysis ? (
            <div className="analysis-content">
              {analysis.summary && (
                <div className="analysis-section analysis-summary">
                  <h3>Summary</h3>

                  <p>
                    {analysis.summary}
                  </p>
                </div>
              )}

              {requiredSkills.length > 0 && (
                <div className="analysis-section">
                  <h3>Required Skills</h3>

                  <div className="analysis-tags">
                    {requiredSkills.map((skill, index) => (
                      <span
                        className="analysis-tag"
                        key={`${skill}-${index}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.responsibilities && (
                <div className="analysis-section">
                  <h3>Responsibilities</h3>

                  <p>
                    {analysis.responsibilities}
                  </p>
                </div>
              )}

              {keywords.length > 0 && (
                <div className="analysis-section">
                  <h3>Keywords</h3>

                  <div className="analysis-tags">
                    {keywords.map((keyword, index) => (
                      <span
                        className="analysis-tag"
                        key={`${keyword}-${index}`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.seniority && (
                <div className="analysis-section">
                  <h3>Seniority</h3>

                  <span className="analysis-badge">
                    {analysis.seniority}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="analysis-empty">
              <div className="empty-icon">
                AI
              </div>

              <h3>No analysis yet</h3>

              <p>
                Analyze this job to identify skills,
                responsibilities, keywords, and seniority.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
