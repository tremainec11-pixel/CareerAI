import { apiRequest } from "./api";

export async function getResumes() {
  return apiRequest("/api/resumes");
}

export async function getResume(resumeId) {
  return apiRequest(`/api/resumes/${resumeId}`);
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest("/api/resumes/upload", {
    method: "POST",
    body: formData,
  });
}

export async function analyzeResumeWithAI(resumeId) {
  return apiRequest(`/api/resumes/${resumeId}/analysis/ai`, {
    method: "POST",
  });
}


export async function deleteResume(resumeId) {
  return apiRequest(`/api/resumes/${resumeId}`, {
    method: "DELETE",
  });
}

