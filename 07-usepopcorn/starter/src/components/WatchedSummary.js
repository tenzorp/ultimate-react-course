const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(
    watched
      .filter((movie) => movie.imdbRating !== "N/A")
      .map((movie) => movie.imdbRating)
  );
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched
      .filter((movie) => movie.runtime !== "N/A")
      .map((movie) => Number(movie.runtime.split(" ")[0]))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
