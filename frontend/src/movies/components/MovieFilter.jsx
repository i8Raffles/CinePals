import {
    Box,
    Button,
    Chip,
    Fade, Paper,
    Popper,
    Stack,
} from "@mui/material";
import {useState} from "react";
import {FILTER_TYPES} from "../../utils/movieApiBuilder";
import {genresList} from "../../utils/genres";

function MovieFilter(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const openGenre = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const onClick = (filter) => {
        props.onFilterChange(filter);
    };

    const renderGenres = () => {
        return (
            <Paper elevation={6} sx={{ display: 'flex',
                p: 2,
                gap: 1,
                width: '72%',
                minWidth: 520,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {genresList.map(genres => (<Chip
                    sx={{
                        color: props.current === genres.id ? 'inherit' : 'rgba(0, 0, 0, 0.87)',
                        bgcolor: props.current === genres.id ? 'rgb(25, 118, 210)' : 'inherit'
                    }}
                    key={genres.id}
                    size="small"
                    variant="outlined"
                    color={props.current === genres.id ? "primary" : "secondary"}
                    onClick={() => onClick(genres.id)}
                    label={genres.name}
                />))}
            </Paper>
        );
    };

    return (
        <Box>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        {renderGenres()}
                    </Fade>
                )}
            </Popper>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
            >
                <Chip
                    color={props.current === FILTER_TYPES.TOP_RATED ? "primary" : "secondary"}
                    onClick={() => onClick(FILTER_TYPES.TOP_RATED)}
                    label="Top rated"
                />
                <Chip
                    color={props.current === FILTER_TYPES.POPULAR ? "primary" : "secondary"}
                    onClick={() => onClick(FILTER_TYPES.POPULAR)}
                    label="Popular"
                />
                <Chip
                    color={props.current === FILTER_TYPES.NOW_PLAYING ? "primary" : "secondary"}
                    onClick={() => onClick(FILTER_TYPES.NOW_PLAYING)}
                    label="Now playing"
                />
                <Chip
                    color={props.current === FILTER_TYPES.UPCOMING ? "primary" : "secondary"}
                    onClick={() => onClick(FILTER_TYPES.UPCOMING)}
                    label="Upcoming"
                />
                <Button m={2} variant={!!genresList.find(g => g.id === props.current) ? 'outlined' : 'text'} onClick={openGenre("right-start")}>
                    By genre
                </Button>
            </Stack>
        </Box>
    );
}

export default MovieFilter;
