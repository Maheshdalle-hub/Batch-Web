const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_BASE_URL = "https://nt-batch-web.vercel.app/verify"; // Replace with your actual site URL

// ✅ Generate a secure token
const generateSecureToken = () => {
  return Math.random().toString(36).substr(2, 12); // Example: 'fj39kdl23vxc'
};

// ✅ Generate a shortened link (NO alias set by us)
export const generateShortenedLink = async () => {
  const userToken = generateSecureToken();  
  localStorage.setItem("userToken", userToken); // Store only the token

  const callbackUrl = `${CALLBACK_BASE_URL}?token=${userToken}`; // Redirects back for verification

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
  return localStorage.getItem(`shortenerCompleted-${storedToken}`) === "true"; 
};
