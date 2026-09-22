import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getJobs } from "../../services/jobService";
import { getApplications } from "../../services/applicationService";
import { getResumes } from "../../services/resumeService";
import { getInterviews } from "../../services/interviewService";

function Dashboard() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [
          jobsData,
          applicationsData,
          resumesData,
          interviewsData,
        ] = await Promise.all([
          getJobs(),
          getApplications(),
          getResumes(),
          getInterviews(),
        ]);

        setJobs(jobsData);
        setApplications(applicationsData);
        setResumes(resumesData);
        setInterviews(interviewsData);
      } catch (err) {
        setError(
          err.message || "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>

          <p className="page-subtitle">
            Welcome back, {user?.full_name}.
          </p>
        </div>

        <Link to="/jobs/new" className="primary-button">
          + Add Job
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Jobs</p>

          <p className="stat-value">
            {loading ? "..." : jobs.length}
          </p>

          <p className="stat-description">
            Career opportunities
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Applications</p>

          <p className="stat-value">
            {loading ? "..." : applications.length}
          </p>

          <p className="stat-description">
            Active applications
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Resumes</p>

          <p className="stat-value">
            {loading ? "..." : resumes.length}
          </p>

          <p className="stat-description">
            Resumes in your profile
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Interviews</p>

          <p className="stat-value">
            {loading ? "..." : interviews.length}
          </p>

          <p className="stat-description">
            Upcoming interviews
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="content-card dashboard-main-card">
          <div className="card-header">
            <div>
              <h2>Recent Jobs</h2>

              <p>
                Your latest career opportunities.
              </p>
            </div>

            <Link
              to="/jobs"
              className="text-link"
            >
              View all
            </Link>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {!loading &&
            jobs.length === 0 &&
            !error && (
              <div className="dashboard-empty">
                <div className="empty-icon">+</div>

                <h3>No jobs yet</h3>

                <p>
                  Add your first job opportunity to
                  start using CareerAI.
                </p>

                <Link
                  to="/jobs/new"
                  className="primary-button"
                >
                  Add Your First Job
                </Link>
              </div>
            )}

          {!loading && jobs.length > 0 && (
            <div className="recent-jobs-list">
              {jobs.slice(0, 5).map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="recent-job-item"
                >
                  <div>
                    <h3>{job.title}</h3>

                    <p>
                      {job.company_name}
                    </p>
                  </div>

                  <span>View →</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="content-card dashboard-side-card">
          <h2>CareerAI</h2>

          <p>
            Analyze job opportunities, manage your
            applications, and prepare for your next
            career move.
          </p>

          <Link
            to="/jobs/new"
            className="secondary-button"
          >
            Add Job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

