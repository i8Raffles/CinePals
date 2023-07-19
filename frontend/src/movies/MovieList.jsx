import {Box, CircularProgress, Stack} from "@mui/material";
import MovieFilter from "./components/MovieFilter";
import useMovieList from "./useMovieList";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/movieApiBuilder";
import { ACTION_TYPES } from "./movieListReducer";
import {useCallback, useEffect, useRef} from "react";

function MovieList(props) {
  const { state, dispatch } = useMovieList();
  const bottom = useRef(null);

  const onFilterChange = function (filter) {
    dispatch({ type: ACTION_TYPES.FILTER_CHANGE, payload: filter });
  };

  useEffect(() => {
      const handleObserver = entries => {
          const target = entries[0];
          if (target.isIntersecting) {
              dispatch({ type: ACTION_TYPES.NEXT_PAGE });
          }
      };

      const observer = new IntersectionObserver(handleObserver, {
          root: null,
          rootMargin: '20px',
          threshold: 0,
      });
      observer.observe(bottom.current);
  }, []);

  return (
      <Box>
          <MovieFilter current={state.searchCriteria.filter} onFilterChange={onFilterChange} />
          {state.loading && <CircularProgress
              variant="indeterminate"
              disableShrink
              color="primary"
              size={40}
              thickness={4}
              sx={{
                  position: 'fixed',
                  right: '40px',
                  bottom: '80px',
          }} />}
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
          <div ref={bottom} />
      </Box>
  );
}

export default MovieList;
