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
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import {red} from "@mui/material/colors";
import { Link } from "react-router-dom";

function MovieThumbnail(props) {
    return <Card sx={{
        minWidth: 120, maxWidth: 240,
        overflow: 'auto',
        flexGrow: 1, flexShrink: 0,
        width: '15%', flexBasis: 'auto' }}>
        <CardHeader sx={{ whiteSpace: 'nowrap' }} avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{props.movie.name[0]}</Avatar>
        } title={props.movie.name} subheader={props.movie.releaseDate}/>
        <Link to={'/movies/' + props.movie.id}>
            <CardMedia
                component="img"
                height="150"
                image={props.movie.poster}
                alt={props.movie.name}
            />
        </Link>
        <CardContent sx={{ height: 80, overflow: 'hidden' }}>
            <Typography variant="body2" color="text.secondary">
                {props.movie.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <Rating value={props.movie.rating / 2} readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
        </CardActions>
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
