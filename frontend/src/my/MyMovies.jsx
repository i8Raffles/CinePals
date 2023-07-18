import { Box, Button } from "@mui/material";
import useMyMovies from "./useMyMovies";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/myApiBuilder";
import { format } from 'date-fns';


function MyMovies() {
  const userId = 1; //hard code
  const { state, deleteMovie } = useMyMovies(userId);
  
  const handleDelete = (userId, movieId) => {
    deleteMovie(userId, movieId);
  };

  return (
      <Box>
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
                  <Box key={m.id} sx={{minWidth: 120, maxWidth: 240}}>
                      <MovieThumbnail
                          key={m.id}
                          movie={{
                              id: m.id,
                              movie_id: m.movie_id,
                              name: m.title,
                              description: m.overview,
                              releaseDate: format(new Date(m.release_date), 'yyyy-MM-dd'),
                              poster: IMAGE_BASE_URL + m.poster_path,
                              rating: m.vote_average,
                          }}
                          sx={{ width: "100%" }}
                      />
                      <Button
                          variant="outlined"
                          onClick={() => handleDelete(userId, m.movie_id)}
                          sx={{ marginTop: 2 }}
                      >
                          Remove
                      </Button>
                  </Box>
              ))}
          </Box>
      </Box>
  );
}

export default MyMovies;
