import api from "@/api/authAPI"


export const fetchUserInfo = async (token: string) => {
    const res = await api.get("user/");
    return res.data;
  };
  