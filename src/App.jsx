import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Home, { loader as trendingLoader } from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails, { loader as movieIdDetails } from "./pages/MovieDetails";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Cast, { loader as movieCast } from "./components/Cast";
import Reviews, { loader as movieReview } from "./components/Reviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: trendingLoader,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetails />,
        loader: movieIdDetails,
        children: [
          {
            path: "cast",
            element: <Cast />,
            loader: movieCast,
          },
          {
            path: "reviews",
            element: <Reviews />,
            loader: movieReview,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
