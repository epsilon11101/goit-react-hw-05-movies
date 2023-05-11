import { Link, useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import Movie from "../components/Movie";

const MovieDetails = () => {
  const { movie } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={movie}>
        {(loadMovieDetails) => {
          return (
            <>
              <Movie movieDetail={loadMovieDetails} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default MovieDetails;

async function loadMovie(movie_id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`
  );
  if (!response.ok) {
    json(
      {
        message: "could not fetch detais for selected movie",
      },
      { status: 500 }
    );
  } else {
    const movieData = await response.json();
    return movieData;
  }
}

export async function loader({ request, params }) {
  const id = params.movieId;
  return defer({
    movie: await loadMovie(id),
  });
}
