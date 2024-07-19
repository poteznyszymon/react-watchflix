const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

export const fetchTrending = async (timeWindow = "day") => {
  const response = await fetch(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return response.json();
};
