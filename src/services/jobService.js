import { apiRequest } from "./api";

export async function getJobs() {
  return apiRequest("/api/jobs");
}

export async function getJob(jobId) {
  return apiRequest(`/api/jobs/${jobId}`);
}

export async function createJob(jobData) {
  return apiRequest("/api/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
}

export async function analyzeJob(jobId) {
  return apiRequest(`/api/jobs/${jobId}/analysis`, {
    method: "POST",
  });
}

export async function analyzeJobWithAI(jobId) {
  return apiRequest(`/api/jobs/${jobId}/analysis/ai`, {
    method: "POST",
  });
}
