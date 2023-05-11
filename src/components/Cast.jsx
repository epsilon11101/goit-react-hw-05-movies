import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import { nanoid } from "nanoid";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const Cast = () => {
  const { cast } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={cast}>
        {(loadCastMovies) => {
          const profiler = loadCastMovies.cast.map((actor) => {
            return (
              <SwiperSlide key={nanoid()} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    sx={{ width: 56, height: 56 }}
                  />
                  <p style={{ textAlign: "center" }}>
                    {actor.name} as <span>{actor.character}</span>
                  </p>
                </div>
              </SwiperSlide>
            );
          });

          return (
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              style={{
                width: "100%",
                height: "13rem",
                marginTop: "2rem",
              }}
            >
              {profiler}
            </Swiper>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Cast;

async function loadCast(movie_id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`
  );

  if (!response.ok) {
    json(
      {
        message: "could not fetch cast for selected movie",
      },
      { status: 500 }
    );
  } else {
    const movieCast = await response.json();
    return movieCast;
  }
}

export async function loader({ request, params }) {
  const id = params.movieId;
  return defer({
    cast: await loadCast(id),
  });
}
