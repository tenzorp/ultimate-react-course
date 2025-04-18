import { useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export const API_KEY = "3d8ed51f";

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error, numResults } = useMovies(query);

  const handleSelectMovie = (id) => {
    setSelectedId((prev) => (id === prev ? null : id));
  };

  const handleSetWatched = (movie) => {
    let newWatched = [...watched];
    let oldMovieIndex = watched.findIndex(
      (item) => item.imdbID === movie.imdbID
    );

    if (oldMovieIndex !== -1) {
      newWatched.splice(oldMovieIndex, 1, movie);
    } else {
      newWatched.push(movie);
    }

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
              onCloseMovie={() => setSelectedId(null)}
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
