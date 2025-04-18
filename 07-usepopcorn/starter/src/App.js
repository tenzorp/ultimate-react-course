import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";

export const API_KEY = "3d8ed51f";

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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );
  const [numResults, setNumResults] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleSelectMovie = (id) => {
    setSelectedId((prev) => (id === prev ? null : id));
  };

  const handleSetWatched = (movie) => {
    let newWatched = [...watched];
    let oldMovieIndex = watched.findIndex(
      (item) => item.imdbID === movie.imdbID
    );
    console.log(oldMovieIndex);
    if (oldMovieIndex !== -1) {
      newWatched.splice(oldMovieIndex, 1, movie);
    } else {
      newWatched.push(movie);
    }

    localStorage.setItem("watched", JSON.stringify(newWatched));
    setWatched(newWatched);
    setSelectedId(null);
  };

  const handleDeleteWatched = (id) => {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults numResults={numResults} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              selectedMovieUserRating={
                watched.find((item) => item.imdbID === selectedId)?.userRating
              }
              onCloseMovies={() => setSelectedId(null)}
              onSetWatched={handleSetWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const SearchResults = ({ numResults }) => {
  return (
    <p className="num-results">
      Found <strong>{numResults}</strong> results
    </p>
  );
};

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ message }) => {
  return <p className="error">{message}</p>;
};
