import { Box } from "@mui/material";
import MovieFilter from "./components/MovieFilter";
import useMovieList from "./useMovieList";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/movieApiBuilder";
import { ACTION_TYPES } from "./movieListReducer";

function MovieList(props) {
  const { state, dispatch } = useMovieList();

  const onFilterChange = function (filter) {
    dispatch({ type: ACTION_TYPES.FILTER_CHANGE, payload: filter });
  };

  return (
      <Box>
          <MovieFilter current={state.filter} onFilterChange={onFilterChange} />
          <Box
              sx={{
                  mt: 2,
                  pb: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  overflow: "auto",
                  flexGrow: 1,
                  flexShrink: 0,
              }}
          >
              {state.movies.map((m) => (
                  <Box key={m.id} sx={{ width: '20%', p: 1 }}><MovieThumbnail
                      key={m.id}
                      movie={{
                          id: m.id,
                          movie_id: m.id,
                          name: m.title,
                          description: m.overview,
                          releaseDate: m.release_date,
                          poster: IMAGE_BASE_URL + m.poster_path,
                          rating: m.vote_average,
                      }}
                  /></Box>
              ))}
          </Box>
      </Box>
  );
}

export default MovieList;
