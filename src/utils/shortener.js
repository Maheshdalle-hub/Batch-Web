const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_BASE_URL = "https://nt-batch-web.vercel.app/verify"; // Your base site URL

// ✅ Generate a secure token
const generateSecureToken = () => {
  return Math.random().toString(36).substr(2, 12); // Example: 'fj39kdl23vxc'
};

// ✅ Generate or Retrieve a shortened link
export const generateShortenedLink = async () => {
  let verificationUrl = sessionStorage.getItem("currentVerificationUrl");

  if (!verificationUrl) {
    // ✅ Generate a new token and create the full verification URL with path
    const token = generateSecureToken();
    verificationUrl = `${CALLBACK_BASE_URL}/${token}`;  // Path-based URL format

    // ✅ Store the full verification URL
    sessionStorage.setItem("currentVerificationUrl", verificationUrl);
  }

  try {
    const response = await fetch(`https://vipurl.in/api?api=${API_KEY}&url=${verificationUrl}`);
    const data = await response.json();

    if (data.status === "success") {
      return data.shortenedUrl; // ✅ Return the shortened link
    } else {
      console.error("❌ Error generating short link:", data.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error connecting to shortener API:", error);
    return null;
  }
};