import { apiRequest } from "./api";

export async function getInterviews() {
  return apiRequest("/api/interviews");
}

export async function getInterview(interviewId) {
  return apiRequest(`/api/interviews/${interviewId}`);
}

export async function createInterview(interviewData) {
  return apiRequest("/api/interviews", {
    method: "POST",
    body: JSON.stringify(interviewData),
  });
}

export async function updateInterview(
  interviewId,
  interviewData
) {
  return apiRequest(`/api/interviews/${interviewId}`, {
    method: "PATCH",
    body: JSON.stringify(interviewData),
  });
}

export async function deleteInterview(interviewId) {
  return apiRequest(`/api/interviews/${interviewId}`, {
    method: "DELETE",
  });
}
