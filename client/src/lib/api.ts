const API_BASE_URL = "http://localhost:3000/api";

interface ApiOptions extends RequestInit {
  token?: string;
  headers?: HeadersInit;
}

export async function apiRequest(endpoint: string, options?: ApiOptions) {
  const { token, headers, ...restOptions } = options || {};
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers: { ...defaultHeaders, ...(headers as Record<string, string>) },
    ...restOptions
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Something went wrong" }));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

// Specific API functions
export const api = {
  getUsers: async (token: string) => {
    return apiRequest("/proxy/users", { token });
  },
  // Logs API
  getLogs: async (token: string) => {
    return apiRequest("/logs", { token });
  },
  // Proxy Config API
  getProxyConfig: async (token: string) => {
    return apiRequest("/proxy/config", { token });
  },
  updateProxyConfig: async (token: string, loggingEnabled: boolean) => {
    return apiRequest("/proxy/config", {
      method: "PATCH",
      token,
      body: JSON.stringify({ loggingEnabled })
    });
  }
};
