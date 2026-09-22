import { apiRequest } from "./api";

export async function getApplications() {
  return apiRequest("/api/applications");
}

export async function getApplication(applicationId) {
  return apiRequest(`/api/applications/${applicationId}`);
}

export async function createApplication(applicationData) {
  return apiRequest("/api/applications", {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
}

export async function updateApplication(applicationId, applicationData) {
  return apiRequest(`/api/applications/${applicationId}`, {
    method: "PATCH",
    body: JSON.stringify(applicationData),
  });
}

export async function deleteApplication(applicationId) {
  return apiRequest(`/api/applications/${applicationId}`, {
    method: "DELETE",
  });
}
