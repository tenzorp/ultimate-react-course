import { useEffect, useState } from "react";
import { API_KEY } from "../App";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numResults, setNumResults] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedQuery}`
        );
        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();

        if (data.Response === "False") throw new Error("No results found");
        setMovies(data.Search);
        setNumResults(Number(data.totalResults) || 0);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [debouncedQuery]);

  return { movies, isLoading, error, numResults };
};
