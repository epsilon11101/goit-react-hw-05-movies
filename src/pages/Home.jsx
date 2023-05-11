import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import TrendingMovie from "../components/TrendingMovie";

const Home = () => {
  const { trending } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Await resolve={trending}>
        {(loadedMovies) => {
          return <TrendingMovie trending={loadedMovies} />;
        }}
      </Await>
    </Suspense>
  );
};

export default Home;

async function loadTrending() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${
      import.meta.env.VITE_KEY
    }`
  );
  if (!response.ok) {
    throw json({ message: "error on fetch movies" });
  } else {
    const resData = await response.json();
    return resData.results;
  }
}

export function loader() {
  return defer({
    trending: loadTrending(),
  });
}
