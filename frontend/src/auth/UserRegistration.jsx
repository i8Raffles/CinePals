import React, {useState} from "react";
import {
    Avatar, Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Typography
} from "@mui/material";
import { withStyles } from "@mui/styles"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "../theme/mainTheme";
import {useNavigate} from "react-router-dom";
import styles from "./styles";
import axios from "axios";

function UserRegistration(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [userName, setUserName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const { classes } = props;
    const navigate = useNavigate();

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = event => {
        setRepeatPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUserNameFieldChange = (event) => {
        setUserName(event.target.value);
    }

    const handleFirstNameFieldChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameFieldChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailFieldChange = (event) => {
        setEmail(event.target.value);
    }

    const createUser = async (event) => {
        event.preventDefault();
        const result = await axios.post("http://localhost:8001/api/register", {
            firstName,
            lastName,
            username: userName,
            email,
            password
        });
        console.log('User register complete', result);
        navigate("/login");
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
                        <InputLabel htmlFor="userName">User Name</InputLabel>
                        <Input id="userName" name="userName" autoComplete="userName" value={userName} autoFocus onChange={handleUserNameFieldChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input id="firstName" name="firstName" autoComplete="firstName" value={firstName} autoFocus onChange={handleFirstNameFieldChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input id="lastName" name="lastName" autoComplete="lastName" value={lastName} autoFocus onChange={handleLastNameFieldChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" type="email" autoComplete="email" value={email} autoFocus onChange={handleEmailFieldChange} />
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
                        <InputLabel htmlFor="repeat-password">Repeat Password</InputLabel>
                        <Input
                            id="repeat-password"
                            type={showPassword ? 'text' : 'password'}
                            value={repeatPassword}
                            autoComplete="repeat-password"
                            onChange={handleRepeatPasswordChange}
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
    return <StyledUserRegistration {...props} />
}

export default StyledRegistrationWithTheme;
