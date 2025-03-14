import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams(); // ✅ Get token from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // ✅ Expires in 2 days

      // ✅ Store verification with expiration
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("verificationToken", token);
      localStorage.setItem("verificationExpires", expirationTime);

      navigate("/subjects"); // ✅ Redirect after verification
    }
  }, [token, navigate]);

  return <p>✅ Hogaya successful! Redirecting...</p>;
};

export default Verify;