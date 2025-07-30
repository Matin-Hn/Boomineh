const BASE_URL = "http://localhost:8000/api/paintings/";

export const fetchPaintings = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const getPainting = async (id) => {
  const res = await fetch(`${BASE_URL}${id}/`);
  return await res.json();
};

export const createPainting = async (data, token) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await res.json();
};

export const updatePainting = async (id, data, token) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await res.json();
};

export const deletePainting = async (id, token) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status === 204;
};
