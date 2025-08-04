import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export const getAccessToken = () => localStorage.getItem("access");

export const setAccessToken = (token) => {
  localStorage.setItem("access", token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refresh", token);
};

export const getRefreshToken = () => localStorage.getItem("refresh");

export const clearTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

const api = axios.create({
  baseURL: API_URL,
});

// Attach Authorization header
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${API_URL}refresh/`, {
          refresh: getRefreshToken(),
        });

        const { access, refresh } = res.data;

        setAccessToken(access);
        if (refresh) setRefreshToken(refresh); // optional, only if API returns new refresh

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🔒 Token refresh failed:", refreshError);
        logout(); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// LOGIN
export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}login/`, { username, password });
  const { access, refresh } = res.data;

  setAccessToken(access);
  setRefreshToken(refresh);

  return res.data;
};

// LOGOUT
export const logout = () => {
  clearTokens();
};

// REGISTER
export const register = async (username, email, password) => {
  const res = await axios.post(`${API_URL}register/`, {
    username,
    email,
    password,
  });
  return res.data;
};

export default api;
