import React, {useState} from "react";
import AppRouter from "./Router";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme/mainTheme";
import {ThemeProvider} from "@mui/material";
import {addAuthHandlerToAxios} from "./utils/authHttpHandler";

export const AuthContext = React.createContext(null);

addAuthHandlerToAxios();

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [themeMode, setThemeMode] = useState('dark');

    const loginUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    const signOutUser = () => {
        setUser(null);
    }

    const changeThemeMode = (themeMode) => {
        setThemeMode(themeMode);
    }

    return <AuthContext.Provider value={user}>
            <ThemeProvider theme={theme(themeMode)}>
                <CssBaseline />
                <AppRouter loginUser={loginUser} signOutUser={signOutUser}
                           themeMode={themeMode} changeThemeMode={changeThemeMode} />
            </ThemeProvider>
        </AuthContext.Provider>
}

export default App;
