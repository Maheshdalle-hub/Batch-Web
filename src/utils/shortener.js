const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_BASE_URL = "https://nt-batch-web.vercel.app/verify"; // Replace with your actual site URL

// ✅ Generate a secure token
const generateSecureToken = () => {
  return Math.random().toString(36).substr(2, 12); // Example: 'fj39kdl23vxc'
};

// ✅ Generate or Retrieve a shortened link
export const generateShortenedLink = async () => {
  let userToken = localStorage.getItem("userToken");

  if (!userToken) {
    userToken = generateSecureToken();
    localStorage.setItem("userToken", userToken);
  }

  const callbackUrl = `${CALLBACK_BASE_URL}?token=${userToken}`;

  try {
    const response = await fetch(`https://vipurl.in/api?api=${API_KEY}&url=${callbackUrl}`);
    const data = await response.json();

    if (data.status === "success") {
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

// ✅ Check if the shortener was completed
export const checkShortenerCompletion = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isVerified = localStorage.getItem("isVerified") === "true";

  return isLoggedIn && isVerified;
};

// ✅ Mark shortener as completed
export const markShortenerAsCompleted = () => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("isVerified", "true");
};