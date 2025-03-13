import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkShortenerCompletion } from "../utils/shortener";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyShortener = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const isCompleted = await checkShortenerCompletion(token);
      if (isCompleted) {
        localStorage.setItem("shortenerCompleted", "true");
        setIsVerified(true);
      }
      setLoading(false);
    };

    verifyShortener();
  }, []);

  if (loading) return <p>🔄 Verifying access...</p>;

  return isVerified ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
