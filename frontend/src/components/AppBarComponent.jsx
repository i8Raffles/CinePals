import * as React from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    styled, InputBase, alpha, Container, Tooltip
} from "@mui/material";
import {LogoutRounded, MovieRounded} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

function AppBarComponent(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = !!props.userName ? ['My movies', 'My reviews', 'My follows', 'Profile'] : ['Login', 'Register'];

    return <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <MovieRounded fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h6" component="div" sx={{mr: 2}}>
                    Movies
                </Typography>
                <Box sx={{flexGrow: 1}}></Box>
                <Search sx={{mr: 2}}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <Box sx={{flexGrow: 0, mr: 2}}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    {props.userName &&
                        <Tooltip title="Sign out">
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="log out"
                                aria-haspopup="true"
                                color="inherit"
                                sx={{p: 0, ml: 3}}>
                                <LogoutRounded />
                            </IconButton>
                        </Tooltip>
                    }
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
}

AppBarComponent.defaultProps = {
    userName: "t.huang"
};

export default AppBarComponent;
