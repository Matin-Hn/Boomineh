import api from "./authAPI";

const BASE_URL = "http://localhost:8000/api/cart/";

export const fetchCart = async () => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const addToCart = async (paintingId) => {
  const res = await api.post(`${BASE_URL}add/`, {
    painting_id: paintingId
  });
  return res.data;
};

// Delete an item from Cart
export const deleteCartItem = async (itemId) => {
  const res = await api.delete(`${BASE_URL}items/${itemId}/`);
  return res.data;
};
