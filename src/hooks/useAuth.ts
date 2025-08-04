export const useAuth = () => {
  const token = localStorage.getItem("refresh");
  return {
    isLoggedIn: !!token,
  };
};
