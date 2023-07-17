import React, {useState} from "react";
import {
    Avatar, Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper, ThemeProvider,
    Typography
} from "@mui/material";
import { withStyles } from "@mui/styles"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "../theme/mainTheme";
import {useNavigate} from "react-router-dom";
import styles from "./styles";

function UserRegistration(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const { classes } = props;
    const navigate = useNavigate();

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUserNameFieldChange = (event) => {
        setUserName(event.target.value);
    }

    const createUser = (event) => {
        event.preventDefault();
        navigate("/movies");
    };

    return (
        <main className={classes.main}>
            <Paper className={classes.paper} sx={{p: 2}}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="userName">Account Name</InputLabel>
                        <Input id="userName" name="userName" autoComplete="userName" value={userName} autoFocus onChange={handleUserNameFieldChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Repeat Password</InputLabel>
                        <Input
                            id="repeat-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 2}}
                        color="primary"
                        onClick={createUser}
                        className={classes.submit}
                    >
                        Create
                    </Button>
                </form>
            </Paper>
        </main>
    );
}

const StyledUserRegistration = withStyles(styles)(UserRegistration);

function StyledRegistrationWithTheme(props) {
    return <ThemeProvider theme={theme}>
        <StyledUserRegistration {...props} />
    </ThemeProvider>
}

export default StyledRegistrationWithTheme;
