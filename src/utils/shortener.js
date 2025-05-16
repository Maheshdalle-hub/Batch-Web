export const generateShortenedLink = async () => {
  const API_KEY = "223ed4c64f0a265df4c96a4328a2a7edc6640a80";
  const CALLBACK_BASE_URL = "https://old-batch.vercel.app/verify"; 

  // ✅ Retrieve or generate token
  let userToken = localStorage.getItem("currentToken");
  if (!userToken) {
    userToken = Math.random().toString(36).substr(2, 12);  // Generate new token if missing
    localStorage.setItem("currentToken", userToken);        // ✅ Store token in localStorage
  }

  const callbackUrl = `${CALLBACK_BASE_URL}/${userToken}`;

  try {
    const response = await fetch(`https://shortxlinks.com/api?api=${API_KEY}&url=${callbackUrl}`);
    const data = await response.json();

    if (data.status === "success") {
      console.log("✅ Shortened link generated:", data.shortenedUrl);
      return data.shortenedUrl;
    } else {
      console.error("❌ Error generating short link:", data.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error connecting to shortener API:", error);
    return null;
  }
};
