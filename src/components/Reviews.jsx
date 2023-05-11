import { defer, json, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { nanoid } from "nanoid";
const Reviews = () => {
  const { review } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={review}>
        {(loadReviews) => {
          const listOfReviews = loadReviews.map((rev) => {
            return (
              <li key={nanoid()}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "2rem",
                  }}
                >
                  <p>{rev.author}</p>
                  <p>{rev.content}</p>
                </div>
              </li>
            );
          });
          return (
            <ul>
              {listOfReviews.length > 0 ? (
                listOfReviews
              ) : (
                <li>
                  <p>NO REVIEWS DATA</p>
                </li>
              )}
            </ul>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Reviews;

async function loadReview(movie_id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US&page=1`
  );

  if (!response.ok) {
    json(
      {
        message: "could not fetch cast for selected movie",
      },
      { status: 500 }
    );
  } else {
    const movieReview = await response.json();
    return movieReview.results;
  }
}

export async function loader({ request, params }) {
  const id = params.movieId;
  return defer({
    review: await loadReview(id),
  });
}
