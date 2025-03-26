const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_BASE_URL = "https://nt-batch-web.vercel.app/verify";  // ✅ Your website URL

// ✅ Generate a secure token
const generateSecureToken = () => {
  return Math.random().toString(36).substr(2, 12);  // Example: 'fj39kdl23vxc'
};

// ✅ Generate or retrieve a shortened link
export const generateShortenedLink = async () => {
  let userToken = localStorage.getItem("userToken");    // ✅ Retrieve stored token

  // ✅ If no token, generate a new one
  if (!userToken) {
    userToken = generateSecureToken();
    localStorage.setItem("userToken", userToken);       // ✅ Store the new token
  }

  // ✅ Generate the shortened link with the stored token
  const callbackUrl = `${CALLBACK_BASE_URL}/${userToken}`;   // ✅ Proper callback format

  try {
    const response = await fetch(`https://vipurl.in/api?api=${API_KEY}&url=${callbackUrl}`);
    const data = await response.json();

    if (data.status === "success") {
      return data.shortenedUrl;  // ✅ Return the shortened link
    } else {
      console.error("❌ Error generating short link:", data.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error connecting to shortener API:", error);
    return null;
  }
};