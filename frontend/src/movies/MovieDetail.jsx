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
    Typography
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {blueGrey, deepOrange, grey} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StyledTextarea from "../components/StyledTextArea";
import { useEffect } from "react";
import { ACTION_TYPES } from "./movieListReducer";
import { useMovie } from "./useMovieList";
import { IMAGE_BASE_URL } from "../utils/movieApiBuilder";

function MovieDetail(props) {
  const { comments } = props;
  const { state, dispatch } = useMovie();

    useEffect(() => {
      state.movieId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      console.log("on initial load with movieId " + state.movieId);
      dispatch({ type: ACTION_TYPES.FETCH_MOVIE, payload: state.movieId });
    }, []);
    
    return <Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
            <Box sx={{display: 'inline-flex', alignSelf: 'flex-start', width: 420, flexGrow: 1}} component="div">
                <img width="100%" alt={state.movie?.title} src={IMAGE_BASE_URL +(state.movie?.poster_path)}/>
            </Box>
            <Paper variant="outlined" sx={{display: 'flex', gap: 2, p: 2, flexDirection: 'column', flexGrow: 1}}
                   component="div">
                <Typography variant="h4" sx={{pl: 1}} component="div">{state.movie?.title}</Typography>
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
                    <Typography variant="span">{state.movie?.release_date}</Typography>
                    <Divider sx={{m: 0}} orientation="vertical" variant="middle" flexItem/>
                    <Typography variant="span">{state.movie?.runtime + " min"}</Typography>
                    <Divider sx={{m: 0}} orientation="vertical" variant="middle" flexItem/>
                    {state.movie && state.movie.genres && state.movie.genres.map((genre) => genre.name).join(', ')}
                </Box>
                <Box p={2} component="p">{state.movie?.overview}</Box>
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={
                        <Rating sx={{fontSize: 32, ml: 1, color: blueGrey[400]}} value={state.movie?.vote_average / 2}
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
                        }}>{state.movie?.vote_average && !isNaN(state.movie.vote_average)
                          ? state.movie.vote_average.toFixed(1)
                          : ''}</Avatar>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={
                        <Rating sx={{fontSize: 32, ml: 1}} value={state.movie?.vote_average / 2}
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
                        }}>{state.movie?.vote_average && !isNaN(state.movie.vote_average)
                          ? state.movie.vote_average.toFixed(1)
                          : ''}</Avatar>
                </Stack>
                <Box sx={{mt: 4}} component="div">
                    <FormControlLabel control={
                        <IconButton aria-label="add to watchlist">
                            <FavoriteIcon sx={{color: grey[400]}} fontSize="large"/>
                        </IconButton>
                    } label="Add to Watchlist" labelPlacement="start"/>
                </Box>
            </Paper>
        </Box>
        <Paper variant="outlined" component="div" sx={{display: 'flex', flexDirection: 'column', mt: 2, p: 2, width: '100%'}}>
            <Stack direction="row" mb={1}>
                <FormControlLabel sx={{alignItems: 'flex-start', flexGrow: 1}} control={
                    <StyledTextarea sx={{width: '100%'}} minRows={3}/>
                } label="Comments" labelPlacement="top"/>
                <Button>Post</Button>
            </Stack>
            {!!comments && comments.length > 0 && comments.map(comment => (
                <Box sx={{display: 'flex', flexDirection: 'row', p: 2, gap: 2 }}>
                    <Avatar>{comment.user.split(' ').map(w => w[0]).join('')}</Avatar>
                    <Paper elevation={0} sx={{bgcolor: 'rgb(243, 242, 241)', p: 2}}>
                        <Stack direction="row" alignItems="center">
                            <Typography variant="span" sx={{ fontWeight: 600 }}>{comment.user}</Typography>
                            <Typography variant="span" sx={{fontSize: 11, color: grey[600], ml: 1}}>{comment.date}</Typography>
                            <Box flexGrow={1} />
                            <Rating sx={{fontSize: 24, mr: 2}} value={comment.rating / 2}
                                    readOnly
                                    precision={0.1}
                                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}/>
                        </Stack>
                        <Typography sx={{mt: 1}}>{comment.comment}</Typography>
                    </Paper>
                </Box>
            ))}
        </Paper>

    </Box>
}

MovieDetail.defaultProps = {
    movie: {
        name: 'The Darkest Minds',
        poster: 'https://image.tmdb.org/t/p/w500//94RaS52zmsqaiAe1TG20pdbJCZr.jpg',
        description: "After a disease kills 98% of America's children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.",
        rating: 7.5,
        type: 'TV-MA',
        duration: '50 min',
        genres: ['Action', 'Adventure', 'Drama']
    },
    comments: [
        {
            user: 'Joe Lipsett',
            comment: "The film leans into all of the book's worst impulses and, most disappointingly, gives star Amandla Stenberg nothing to do. The FX is on par with other YA films, but the disinterest in exploring this dystopia renders The Darkest Minds hollow.",
            date: 'December 1, 2021',
            rating: 6.5
        },
        {
            user: 'Wendy Ide',
            comment: "The film shares far too many tropes with other YA sci-fi properties - The Hunger Games, The Maze Runner, Divergent - to make a mark in the unforgiving post-apocalyptic wasteland of the adolescent market.",
            date: 'August 12, 2018',
            rating: 8.5
        }
    ]
}



export default MovieDetail;
