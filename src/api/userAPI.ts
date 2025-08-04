import api from "./authAPI"


export const fetchUserInfo = async (token: string) => {
    const res = await fetch("http://localhost:8000/api/auth/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to fetch user info");
  
    const data = await res.json();
    return data;
  };
  