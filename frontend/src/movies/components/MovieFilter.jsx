import {
    Box,
    Button,
    Chip,
    Fade,
    Popper,
    Stack,
} from "@mui/material";
import {useState} from "react";
import {FILTER_TYPES} from "../../utils/movieApiBuilder";

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
            <Stack direction="row" spacing={1}>
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="Action"
                />
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="Adventure"
                />
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="Animation"
                />
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="Comedy"
                />
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="Romance"
                />
                <Chip
                    size="small"
                    variant="outlined"
                    onClick={onClick}
                    label="History"
                />
            </Stack>
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
                <Button m={2} onClick={openGenre("right")}>
                    By genre
                </Button>
            </Stack>
        </Box>
    );
}

export default MovieFilter;
