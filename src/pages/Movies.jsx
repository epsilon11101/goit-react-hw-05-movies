import { json, useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { useEffect, useState } from "react";
import TrendingMovie from "../components/TrendingMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const myquery = searchParams.get("search");

  useEffect(() => {
    const queryVal = myquery ? myquery.trim() : "";
    if (queryVal === "") return;

    async function fetchMovies() {
      const movies = await loadSearchMovies(myquery);
      setMovies(movies);
    }

    fetchMovies();
  }, [myquery]);

  async function loadSearchMovies(queryData) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${queryData}&api_key=${
        import.meta.env.VITE_KEY
      }&page=1`
    );
    if (!response.ok) {
      throw json({ message: "could not find movie" }, { status: 500 });
    } else {
      const movies = await response.json();
      return movies.results;
    }
  }

  const handleSubmit = async (queryResponse) => {
    setSearchParams({ search: queryResponse });
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {movies.length > 0 && <TrendingMovie trending={movies} />}
    </>
  );
};

export default Movies;
