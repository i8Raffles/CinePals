import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Rating,
    Typography
} from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import StarIcon from '@mui/icons-material/Star';
import {deepOrange, red, grey} from "@mui/material/colors";
import { Link } from "react-router-dom";
import React, { useState  } from "react";
import axios from "axios";

function MovieThumbnail(props) {
    const [state, setState] = useState({
        addToWatchlistSuccess: false,
        addToWatchlistError: null,
      });
      const handleAddToWatchlistClick = () => {
        const movieId = props.movie.movie_id; // Get the movieId from props
        const userId = 1; // Replace this with the actual userId
    
        axios
          .post(`/api/watchlists/${movieId}/${userId}`)
          .then((response) => {
            console.log("Movie added to watchlist");
            setState({
              addToWatchlistSuccess: true,
              addToWatchlistError: null,
            });
          })
          .catch((error) => {
            console.error("Error adding movie to watchlist:", error);
            setState({
              addToWatchlistSuccess: false,
              addToWatchlistError: "This movie already in the watchlist",
            });
          });
      };

    return <Card sx={{
        p: 1,
        overflow: 'hidden',
        flexGrow: 1, flexShrink: 0,
        width: '100%', flexBasis: 'auto'}}>
        
        <Link to={'/movies/' + props.movie.movie_id}>
            <CardMedia
                component="img"
                height="150"
                image={props.movie.poster}
                alt={props.movie.name}
            />
        </Link>
        {/* <CardHeader sx={{ whiteSpace: 'nowrap' }} avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{props.movie.name[0]}</Avatar>
        } title={props.movie.name} subheader={props.movie.releaseDate}/> */}
        <CardHeader
        sx={{ whiteSpace: "nowrap", width: '100%' }}
        title={
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: "16px", lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", width: '100%', textOverflow: "ellipsis" }}
            title={props.movie.name} // Show full title on hover
          >
            {props.movie.name}
          </Typography>
        }
        subheader={props.movie.releaseDate}
      />
        <CardActions disableSpacing>
            <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlistClick}>
                {/* <FavoriteIcon /> */}
                <PlaylistAddIcon/>
            </IconButton>

            <Rating value={props.movie.rating / 2} readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
            <Avatar sx={{ width: 30, height: 30, bgcolor: deepOrange[500], fontSize: 14, ml: 1 }}>{parseFloat(props.movie.rating).toFixed(1)}</Avatar>
        </CardActions>
        {state.addToWatchlistSuccess && (
          <Typography variant="body2" color="text.secondary">
            Movie added to watchlist successfully!
          </Typography>
        )}
        {state.addToWatchlistError && (
          <Typography variant="body2" color="error">
            {state.addToWatchlistError}
          </Typography>
        )}
        <CardContent sx={{ height: 80, overflow: 'hidden' }}>
            <Typography variant="body2" color="text.secondary">
                {props.movie.description}
            </Typography>
        </CardContent>
    </Card>
}

MovieThumbnail.defaultProps = {
    movie: {
        id: 0,
        name: 'The lord of the rings',
        description: 'The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel The Lord of the Rings by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring, The Two Towers, and The Return of the King.',
        releaseDate: 'September 14, 2016',
        rating: 7.5,
        poster: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-thumbnail-1659474646743.jpg'
    }
}

export default MovieThumbnail;
