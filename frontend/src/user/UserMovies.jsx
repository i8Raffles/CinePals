import { Box } from "@mui/material";
import useUserMovies from "./userUserMovies";
import MovieThumbnail from "../components/MovieThumbnail";
import { IMAGE_BASE_URL } from "../utils/myApiBuilder";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';


function UserMovies(props) {
    const { userId } = useParams();
    const { state } = useUserMovies(userId);


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
                    </Box>
                ))}
            </Box>
        </Box>
  );
}

export default UserMovies;
