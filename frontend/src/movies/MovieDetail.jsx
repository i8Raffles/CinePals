import {
    Avatar,
    Box,
    Button,
    Divider,
    FormControlLabel,
    IconButton,
    Paper,
    Rating,
    Stack,
    Typography,
    Dialog, 
    DialogContent
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {blueGrey, deepOrange, grey} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StyledTextarea from "../components/StyledTextArea";
import { IMAGE_BASE_URL } from "../utils/myApiBuilder";
import useMovieDetail from "./useMovieDetail";
import { useParams } from "react-router-dom";
import {React, useState} from "react";
import { format, isValid } from 'date-fns';
import YouTubePlayer from "./youTubePlayer";

function MovieDetail() {
    const { movieId } = useParams();
    // Memoize the movieId value to prevent unnecessary re-renders
    const { state, handleSubmit, handleAddToWatchlist } = useMovieDetail(movieId);
    
    // const [newRating, setNewRating] = useState({});
    const [newRating, setNewRating] = useState(0);
    const [newReview, setNewReview] = useState("");
    const [openPlayer, setOpenPlayer] = useState(false); 
    // console.log("state in MovieDetail :", state);
    const reviews = state.reviews;
    // console.log("reviews of this movie in MovieDetail :", state.reviews);
    const handleAddToWatchlistClick = () => {
        handleAddToWatchlist();
      };

    const youtubeVideoId = state.movie.trailer;

    const handlePlayTrailer = () => {
        setOpenPlayer(true);
      };
    
      const handleClosePlayer = () => {
        setOpenPlayer(false);
      };

      const handleReviewChange = (event) => {
        setNewReview(event.target.value);
        console.log("the new Review you are typing is : ", newReview);
      };

      const handlePostReview = (newReview, newRating) => {
        console.log("newRating in handlePostReview", newRating, "newReview: ", newReview);
        handleSubmit(newReview, newRating);
        setNewReview("");
        setNewRating(0);    

    };

    const handleRatingChange = (event) => {
        const updatedRating = parseFloat(event.target.value);
        console.log("set New Rating is ", updatedRating);
        setNewRating(updatedRating);
      };
    

    const movie ={
        id: state.movie.id,
        movie_id: state.movie.id,
        name: state.movie.title,
        description: state.movie.overview,
        releaseDate: state.movie.release_date,
        poster: IMAGE_BASE_URL +state.movie.poster_path,
        rating: state.movie.vote_average,
        genres: state.movie.genres,
        runtime:state.movie.runtime

    };

    if (!state.movie || Object.keys(state.movie).length === 0) {
        return <div>Loading...</div>;
      }
    return <Box key={movie.id}>
        
        <Box  sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
            <Box sx={{display: 'inline-flex', alignSelf: 'flex-start', width: 420, flexGrow: 1}} component="div">
                <img width="100%" alt={movie.name} src={movie.poster}/>
            </Box>
            <Paper variant="outlined" sx={{display: 'flex', gap: 2, p: 2, flexDirection: 'column', flexGrow: 1}}
                   component="div">
                <Typography variant="h4" sx={{pl: 1}} component="div">{movie.name}</Typography>
                <Box sx={{
                    pl: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: 'fit-content',
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    fontSize: 14,
                    '& hr': {
                        mx: 0.5,
                    },
                }}
                     component="div">
                    <Typography variant="span">{movie.releaseDate}</Typography>
                    <Divider sx={{m: 0}} orientation="vertical" variant="middle" flexItem/>
                    <Typography variant="span">{movie.runtime} minutes</Typography>
                    <Divider sx={{m: 0}} orientation="vertical" variant="middle" flexItem/>
                    {/* <Typography variant="span">{movie.genres.join(', ')}</Typography> */}
                </Box>
                
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={
                        <Rating sx={{fontSize: 32, ml: 1, color: blueGrey[400]}} value={movie.rating / 2}
                                readOnly
                                precision={0.1}
                                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                    } label="Public Rating" labelPlacement="start"/>
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                            bgcolor: deepOrange[500],
                            fontSize: 14,
                            ml: 4
                        }}>{movie.rating.toFixed(1)}</Avatar>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={
                        <Rating sx={{fontSize: 32, ml: 1}} value={movie.rating / 2}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                    } label="App Rating" labelPlacement="start"/>
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                            bgcolor: deepOrange[500],
                            fontSize: 14,
                            ml: 4
                        }}>{movie.rating.toFixed(1)}
                    </Avatar>
                </Stack>
                <Box p={2} component="p">{movie.description}</Box>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handlePlayTrailer}>
                    Play Trailer
                    </Button>
                  <FormControlLabel control={
                    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlistClick}>
                        <FavoriteIcon sx={{color: grey[400]}} fontSize="large"/>
                    </IconButton>
                     } label="Add to My Movies" labelPlacement="start"/>
                    {/* Display the error message */}
              {state.error && <Typography color="error">{state.error}</Typography>}
                </Box>

                {/* Dialog/Modal to show the video player */}
                <Dialog open={openPlayer} onClose={handleClosePlayer} fullWidth maxWidth="md">
                    <DialogContent>
                    <YouTubePlayer videoId={youtubeVideoId} onClose={handleClosePlayer} />
                    </DialogContent>
                </Dialog>

            </Paper>
        </Box>
        <Paper variant="outlined" component="div" sx={{display: 'flex', flexDirection: 'column', mt: 2, p: 2, width: '100%'}}>
        <Stack direction="row" alignItems="center">
                      
                      <Box flexGrow={1} />
                      <Rating
                        value={newRating !== undefined ? newRating : 0}
                        onChange={(event) => handleRatingChange(event)}
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                      <Typography variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}
                      >{(newRating * 2.0 || parseFloat(movie.rating).toFixed(1)) }
                      </Typography>
                    </Stack>
            <Stack direction="row" mb={1}>
                <FormControlLabel sx={{alignItems: 'flex-start', flexGrow: 1}} control={
                    <StyledTextarea sx={{width: '100%'}} minRows={3} value={newReview} onChange={(event) => handleReviewChange(event)}
                    />
                } label="Reviews" labelPlacement="top" />
                <Button onClick={()=>handlePostReview(newReview, newRating)}>Post</Button>
            </Stack>
            {/* Display the error message */}
              {state.error && <Typography color="error">{state.error}</Typography>}
            {reviews && reviews.length > 0 && reviews.map(review => (
                <Box key={review.id} sx={{display: 'flex', flexDirection: 'row', p: 2, gap: 2}}>
                    {/* <Avatar>{comment.user.split(' ').map(w => w[0]).join('')}</Avatar> */}
                    <Avatar>{review.username.split(' ').map(w => w[0]).join('')}</Avatar>
                    <Paper elevation={0} sx={{bgcolor: 'rgb(243, 242, 241)', p: 2 ,width: '100%'}}>
                        <Stack direction="row" alignItems="center" >
                            <Typography variant="span" sx={{ fontWeight: 600 }}>{review.username}</Typography>
                            <Typography variant="span" sx={{ fontSize: 11, color: grey[600], ml: 1 }}>
                            {review.created_at && isValid(new Date(review.created_at))
                                ? format(new Date(review.created_at), 'yyyy-MM-dd')
                                : 'Invalid Date'}
                            </Typography>
                            
                            <Box flexGrow={1} />
                            <Rating sx={{fontSize: 24, mr: 2}} value={review.rating / 2}
                                readOnly
                                precision={0.1}
                                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                            <Typography variant="h7" sx={{ color: 'black', fontWeight: 'bold' }}
                            >{review.rating }
                            </Typography>
                        </Stack>
                        <Typography sx={{mt: 1}}>{review.review}</Typography>
                    </Paper>
                </Box>
            ))}
        </Paper>
        
    </Box>
}

export default MovieDetail;
