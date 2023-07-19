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
import {useContext} from "react";
import {AuthContext} from "../App";
import { Link } from 'react-router-dom';
import useSearch from '../movies/useSearch';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MaterialUISwitch from "./MaterialUISwitch";

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
    const [searchText, setSearchText] = React.useState('');
    const navigate = useNavigate();


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === "Login") {
            return navigate("/login");
        }
    };

    const user = useContext(AuthContext);

    // const settings = !!(user?.userName) ? ['My movies', 'My reviews', 'My follows', 'Profile'] : ['Login', 'Register'];
    const settings = !!(user?.userName)
  ? [
      { label: "My movies", link: "/my/movies" },
      { label: "My reviews", link: "/my/reviews" },
      { label: "My follows", link: "/my/follows" },
      { label: "Profile", link: "/my/profile" },
    ]
  : [
      { label: "Login", link: "/login" },
      { label: "Register", link: "/register" },
    ];

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate(`/movies/search/${searchText}`);
        setSearchText('');
      }
    };

    const onChangeThemeMode = (event) => {
        props.changeThemeMode(event.target.checked ? 'dark' : 'light');
    }

    return <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <MovieRounded fontSize="large" sx={{mr: 1}}/>
              <Link to="/">
                <Typography variant="h6" component="div" sx={{mr: 2}}>
                    CinePals
                </Typography>
              </Link>
                <MaterialUISwitch checked={props.themeMode === 'dark'} onChange={onChangeThemeMode} />
                <Box sx={{flexGrow: 1}}></Box>
                <Search sx={{mr: 2}}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                            <MenuItem key={setting.label} component={Link} to={setting.link} onClick={() => handleCloseUserMenu(setting)}>
                                <Typography textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    {!!user &&
                        <Tooltip title="Sign out">
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="log out"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={props.signOutUser}
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
