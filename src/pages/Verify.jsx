import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("currentToken");

    if (!storedToken) {
      console.log("❌ No token found in localStorage!");
      setInvalidToken(true);
      return;
    }

    if (!token || token !== storedToken) {
      console.log("❌ Token not verified!");
      setInvalidToken(true);
      return;
    }

    // ✅ Store verification info
    const expirationTime = Date.now() + 1.5 * 24 * 60 * 60 * 1000;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationExpires", expirationTime);

    // ✅ Clear used token
    localStorage.removeItem("currentToken");

    setVerified(true);
    console.log("✅ Verification successful. Redirecting...");
    setTimeout(() => navigate("/"), 2000);
  }, [token, navigate]);

  // Handle class selection after verification
  const handleClassSelection = (classNumber) => {
    localStorage.setItem("selectedClass", classNumber);
    navigate(`/subjects/${classNumber}`);
  };

  return (
    <div className="verify-container">
      {verified ? (
        <p>✅ Verification successful! Redirecting...</p>
      ) : invalidToken ? (
        <p>❌ Tumhe sahi se karna nahi aa rha. Website ka data clear karo chrome pe jaake, and then chrome pe meri website ko kholna. jab tum click here dabaona tab meri website chrome pe open Hui honi chahiye. </p>
      ) : (
        <p>🔄 Verifying...</p>
      )}

      {!verified && !invalidToken && (
        <div className="class-selection">
          <p>Please select your class:</p>
          <button onClick={() => handleClassSelection(9)}>Class 9</button>
          <button onClick={() => handleClassSelection(10)}>Class 10</button>
          <button onClick={() => handleClassSelection(11)}>Class 11</button>
        </div>
      )}

      <style jsx>{`
        .verify-container {
          text-align: center;
          margin-top: 50px;
          font-family: Arial, sans-serif;
        }

        p {
          font-size: 18px;
          color: #333;
          margin: 20px;
        }

        .class-selection {
          margin-top: 30px;
        }

        .class-selection button {
          display: block;
          margin: 10px auto;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .class-selection button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Verify;
