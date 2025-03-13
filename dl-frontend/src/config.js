const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:10000"
  : "https://digital-library-1-wd96.onrender.com";

export default API_BASE_URL;
