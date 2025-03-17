const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_BASE_URL = "https://nt-batch-web.vercel.app/verify"; // Replace with your actual site URL

// ✅ Generate a secure token
const generateSecureToken = () => {
  return Math.random().toString(36).substr(2, 12); // Example: 'fj39kdl23vxc'
};

// ✅ Generate a shortened link (NO alias set by us)
export const generateShortenedLink = async () => {
  let userToken = generateSecureToken();
  
  // ✅ Ensure a fresh token every time (remove old token if it exists)
  localStorage.setItem("userToken", userToken);
  
  const callbackUrl = `${CALLBACK_BASE_URL}/token=${userToken}`; // Redirects back for verification

  try {
    const response = await fetch(`https://vipurl.in/api?api=${API_KEY}&url=${callbackUrl}`);
    const data = await response.json();

    if (data.status === "success") {
      return data.shortenedUrl; // ✅ Shortened link (vipurl.in/xyz456)
    } else {
      console.error("❌ Error generating short link:", data.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error connecting to shortener API:", error);
    return null;
  }
};

// ✅ Check if the shortener was completed
export const checkShortenerCompletion = async () => {
  const storedToken = localStorage.getItem("userToken");
  if (!storedToken) return false; // If no token exists, return false

  // ✅ Get used tokens list from localStorage
  const usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

  // ✅ Prevent reused tokens
  if (usedTokens.includes(storedToken)) {
    console.log("❌ Token already used! Generate a new one.");
    return false;
  }

  try {
    // ✅ Check if the shortener was completed (Replace with actual API call if needed)
    const isCompleted = localStorage.getItem(`shortenerCompleted-${storedToken}`) === "true";

    if (isCompleted) {
      // ✅ Mark token as used
      usedTokens.push(storedToken);
      localStorage.setItem("usedTokens", JSON.stringify(usedTokens));
      return true; // Shortener verified
    }
  } catch (error) {
    console.error("❌ Error checking verification:", error);
  }

  return false;
};