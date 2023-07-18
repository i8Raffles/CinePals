import {React} from "react";
import { Box, Avatar, Paper, Stack, Typography, Rating} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import useUserreviews from "./useUserReviews";
import { IMAGE_BASE_URL } from "../utils/myApiBuilder";
import { useParams } from "react-router-dom";
import StyledTextarea from "../components/StyledTextArea";


function UserReviews(props) {
    const { userId } = useParams();
    const { state } = useUserreviews(userId);
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
                <Paper variant="outlined" component="div" sx={{ display: 'flex', flexDirection: 'column', mt: 2, p: 2, width: '100%' }}>
                    {state.movies.map((m) => (
                        <Box key={m.id} sx={{ display: 'flex', flexDirection: 'row', p: 2, gap: 2 }}>
                            <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start', width: '10%', flexGrow: 1 }} component="div">
                                <Link to={`/movies/${m.movie_id}`}>
                                    <img width="100%" height="100%" alt={m.title} src={IMAGE_BASE_URL + m.poster_path} />
                                </Link>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" sx={{ pl: 1 }} component="div">
                                        {m.original_title}
                                    </Typography>
                                    <Typography variant="span" sx={{ fontSize: 14, ml: 1 }}>
                                        {new Date(m.release_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </Typography>
                                </Box>

                                <Paper elevation={0} sx={{  width: '100%', p: 2, mt: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={m.profile_url} alt={m.username}></Avatar>
                                        <Typography variant="span" sx={{ fontWeight: 600, ml: 1 }}>Written by {m.username} on {new Date(m.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}</Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center">

                                        <Box flexGrow={1} />
                                        <Rating
                                            value={parseFloat(m.rating /2.0 )}
                                            precision={0.5}
                                            readOnly
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Typography variant="h7" sx={{ fontWeight: 'bold' }}
                                        >{parseFloat(m.rating)}
                                        </Typography>
                                    </Stack>
                                    <Paper sx={{ width: '100%' }}>
                          <StyledTextarea
                              value={m.review}
                              readOnly
                              style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                          />
                                    </Paper>

                                </Paper>

                            </Box>
                        </Box>
                    ))}

                </Paper>
            </Box>
        </Box>
      );
}

export default UserReviews;
