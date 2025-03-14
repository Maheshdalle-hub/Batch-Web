import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Verify = () => {
  const { token: urlToken } = useParams(); // Token from URL path
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Extract token from query parameters if it exists
    const queryParams = new URLSearchParams(location.search);
    const queryToken = queryParams.get("token");

    // ✅ Use either URL token or query token
    const finalToken = urlToken || queryToken;

    if (finalToken) {
      localStorage.setItem(`shortenerCompleted-${finalToken}`, "true");
      localStorage.setItem("isLoggedIn", "true"); // ✅ Mark user as logged in
      navigate("/subjects"); // Redirect to subjects page
    }
  }, [urlToken, location, navigate]);

  return <p>✅ Hogaya successful! Redirecting...</p>;
};

export default Verify;