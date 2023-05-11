import { Link } from "react-router-dom";

import classes from "./TrendingMovie.module.css";

const TrendingMovie = ({ trending }) => {
  const movies = trending.map((movie) => {
    return (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
      </li>
    );
  });

  return <ul className={classes.list}>{movies}</ul>;
};

export default TrendingMovie;
