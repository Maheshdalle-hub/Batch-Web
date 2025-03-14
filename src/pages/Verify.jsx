import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem(`shortenerCompleted-${token}`, "true");
      navigate("/subjects"); // ✅ Redirect to subjects after verification
    }
  }, [token, navigate]);

  return <p>✅ hoagaya successful! Redirecting...</p>;
};

export default Verify;
