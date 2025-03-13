const API_KEY = "0a0c7508fe669b4259d5f70d55dfdc467ea177bc";
const CALLBACK_URL = "https://nt-batch-web.vercel.app/verify"; // 🔹 Verification URL

// ✅ Generate a shortened link using VIPURL.in
export const generateShortenedLink = async (token) => {
  try {
    const response = await fetch(`https://vipurl.in/api?api=${API_KEY}&url=${CALLBACK_URL}/${token}&alias=${token}`);
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

// ✅ Check if the user completed the shortener (using local storage tracking)
export const checkShortenerCompletion = (token) => {
  return localStorage.getItem(`shortenerCompleted-${token}`) === "true";
};
