import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

import { nanoid } from "nanoid";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";

const Movie = ({ movieDetail }) => {
  const {
    poster_path,
    overview,
    vote_average,
    original_title,
    genres,
    release_date,
  } = movieDetail;

  const { movieId } = useParams();
  const navigate = useNavigate();

  const allGenres = genres.map((genre) => <li key={nanoid()}>{genre.name}</li>);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Return
          </Button>
          <div style={{ width: "100%", heigh: "100%" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            />
          </div>
        </Grid>
        <Grid xs={4}>
          <p>{`${original_title}(${release_date})`}</p>
          <p>
            User Score: <span>{vote_average}</span>
          </p>
          <p>Overview</p>
          <p>{overview}</p>
          <p>Genres</p>
          <ul style={{ display: "flex", gap: "2rem" }}>{allGenres}</ul>
        </Grid>
        <Grid xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignContent: "center",
              gap: "2rem",
            }}
          >
            <Link to={"cast"}>Cast</Link>
            <Link to={"reviews"}>Reviews</Link>
          </div>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
