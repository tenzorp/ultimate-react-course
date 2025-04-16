import { useEffect, useState } from "react";
import { API_KEY } from "../App";
import StarRating from "./StarRating";

const MovieDetails = ({
  selectedId,
  selectedMovieUserRating,
  onCloseMovies,
  onSetWatched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    imdbID,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading && <div className="loader">Loading...</div>}
      {!isLoading && error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovies}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                defaultRating={selectedMovieUserRating}
                onSetRating={(rating) => setUserRating(rating)}
              />
              <button
                className="btn-add"
                onClick={() =>
                  onSetWatched({
                    Poster: poster,
                    Title: title,
                    imdbID,
                    imdbRating,
                    userRating,
                    runtime,
                  })
                }
              >
                + Add to List
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
