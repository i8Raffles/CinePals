import React, {useState} from "react";
import AppRouter from "./Router";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme/mainTheme";
import {ThemeProvider} from "@mui/material";

export const AuthContext = React.createContext(null);

function App() {

    const [user, setUser] = useState(null);
    const [themeMode, setThemeMode] = useState('dark');

    const loginUser = (user) => {
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
