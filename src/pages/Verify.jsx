import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // ✅ 2 days from now

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("verificationToken", token);
      localStorage.setItem("verificationExpires", expirationTime);

      navigate("/subjects"); // ✅ Redirect after storing data
    }
  }, [token, navigate]);

  return <p>✅ Hogaya successful! Redirecting...</p>;
};

export default Verify;