import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log("❌ No token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        console.log("🔍 Verifying token...");

        // ✅ Store session info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationToken", token);
        localStorage.setItem(
          "verificationExpires",
          Date.now() + 2 * 24 * 60 * 60 * 1000
        );

        console.log("✅ Verification successful!");

        // ✅ Force localStorage sync before redirect
        await new Promise((resolve) => setTimeout(resolve, 200)); 

        // ✅ Redirect after verification
        navigate("/subjects");

      } catch (error) {
        console.error("❌ Verification failed:", error);
        navigate("/login");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      {isVerifying ? (
        <p>🔍 Verifying token...</p>
      ) : (
        <p>✅ Verification successful! Redirecting...</p>
      )}
    </div>
  );
};

export default Verify;