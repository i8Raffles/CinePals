import { Box, ThemeProvider } from "@mui/material";
import MovieFilter from "./components/MovieFilter";
import useMovieList from "./useMovieList";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/movieApiBuilder";
import { ACTION_TYPES } from "./movieListReducer";
import theme from "../theme/mainTheme";

function MovieList(props) {
  const { state, dispatch } = useMovieList();

  const onFilterChange = function (filter) {
    dispatch({ type: ACTION_TYPES.FILTER_CHANGE, payload: filter });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <MovieFilter current={state.filter} onFilterChange={onFilterChange} />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            overflow: "auto",
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          {state.movies.map((m) => (
            <MovieThumbnail
              key={m.id}
              movie={{
                id: m.id,
                name: m.title,
                description: m.overview,
                releaseDate: m.release_date,
                poster: IMAGE_BASE_URL + m.poster_path,
                rating: m.vote_average,
              }}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MovieList;
