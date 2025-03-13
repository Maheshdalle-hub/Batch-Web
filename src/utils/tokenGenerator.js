export const generateUserToken = () => {
  const token = Math.random().toString(36).substr(2, 10); // ✅ Unique 10-char token
  localStorage.setItem("userToken", token);
  return token;
};
