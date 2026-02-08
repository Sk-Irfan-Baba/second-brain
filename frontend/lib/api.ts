// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchWithAuth(endpoint: string, token: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}

// Specific helper for Semantic Search
export const searchBrain = async (query: string, token: string) => {
  return fetchWithAuth("/search", token, {
    method: "POST",
    body: JSON.stringify({ query }),
  });
};

// Specific helper for Capturing Notes
export const captureKnowledge = async (data: { title: string; content: string; tags?: string[] }, token: string) => {
  return fetchWithAuth("/capture", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
};