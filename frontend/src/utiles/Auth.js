import {jwtDecode} from "jwt-decode";

// ✅ Get token from localStorage
export const getTokenFromUser = () => {
  return localStorage.getItem("token");
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  const token = getTokenFromUser();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Optional: Check token expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      logoutUser();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Token decode error:", error);
    logoutUser();
    return false;
  }
};

// ✅ Get user data from token
export const getUserFromToken = () => {
  const token = getTokenFromUser();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// ✅ Get user role
export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.role || null;
};

// ✅ Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect to login page
};
