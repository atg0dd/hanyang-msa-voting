export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed?.error) message = parsed.error;
    } catch {
      // not JSON, fall back to the raw text below
    }
    throw new Error(message || `Request failed with ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export function getTeams() {
  return request("/teams");
}

export function getTeamById(teamId) {
  return request(`/teams/${teamId}`);
}

export function getResults() {
  return request("/results");
}

export function requestVoteCode(payload) {
  return request("/votes/request-code", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitVote(payload) {
  return request("/votes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createTeam(payload) {
  return request("/teams", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteTeam(teamId) {
  return request(`/teams/${teamId}`, {
    method: "DELETE",
  });
}

