import { Box, ThemeProvider } from "@mui/material";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/movieApiBuilder";
import theme from "../theme/mainTheme";
import useSearch from "./useSearch";
import { useParams } from "react-router";
import { Typography } from "@mui/material";

function SearchResults() {
  const { searchText } = useParams();
  const { state } = useSearch(searchText);

  const moviesWithPosters = state.movies.filter((m) => m.poster_path);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Search results for "{searchText}"
        </Typography>

        {!state.loading && moviesWithPosters.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No results found.
          </Typography>
        ) : (
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
            {moviesWithPosters.map((m) => (
              <Box key={m.id} sx={{ width: '20%', p: 1 }}>
                <MovieThumbnail
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
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default SearchResults;
