const baseUrl = "https://api.themoviedb.org/3";
const movieBaseUrl = "https://api.themoviedb.org/3/movie";
const showsBaseUrl = "https://api.themoviedb.org/3/tv";
const apiKey = import.meta.env.VITE_API_KEY;

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

export const fetchTrending = async (timeWindow = "day", page = 1) => {
  const response = await fetch(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}&page=${page}`
  );
  return response.json();
};

export const fetchMovies = async (type: string = "popular", page = 1) => {
  const response = await fetch(
    `${movieBaseUrl}/${type}?api_key=${apiKey}&page=${page}`
  );
  return response.json();
};

export const fetchShows = async (type: string = "popular", page = 1) => {
  const response = await fetch(
    `${showsBaseUrl}/${type}?api_key=${apiKey}&page=${page}`
  );
  return response.json();
};

export const fetchDetails = async (type: string, id: string) => {
  const response = await fetch(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return response.json();
};

export const searchData = async (query: string) => {
  const response = await fetch(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}`
  );
  return response.json();
};

export const fetchCredits = async (type: string, id: string) => {
  const response = await fetch(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return response.json();
};
