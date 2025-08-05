// src/api/paintingsAPI.js
import api from "./authAPI"; // axios instance with refresh logic

const BASE_URL = "http://localhost:8000/api/paintings/"; 

export const fetchPaintings = async () => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const getPainting = async (id) => {
  const res = await api.get(`${BASE_URL}${id}/`);
  return res.data;
};

export const createPainting = async (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await api.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updatePainting = async (id, data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await api.put(`${BASE_URL}${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deletePainting = async (id) => {
  const res = await api.delete(`${BASE_URL}${id}/`);
  return res.status === 204;
};


export const PaintingsAPI = {
  list: () => api.get(BASE_URL),
  retrieve: (id) => api.get(`${BASE_URL}${id}/`),
  like: (id) => api.post(`${BASE_URL}${id}/like/`),
  unlike: (id) => api.post(`${BASE_URL}${id}/unlike/`),
  favorites: () => api.get(`${BASE_URL}favorites/`),
}

export const fetchFavorites = async () => {
  const res = await api.get(`${BASE_URL}favorites/`);
  return res.data;
};
