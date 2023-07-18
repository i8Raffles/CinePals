import React, {useState} from "react";
import AppRouter from "./Router";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme/mainTheme";
import {ThemeProvider} from "@mui/material";

export const AuthContext = React.createContext(null);

function App() {

    const [user, setUser] = useState(null);

    const loginUser = (user) => {
        setUser(user);
    }

    const signOutUser = () => {
        setUser(null);
    }

    return <React.StrictMode>
        <AuthContext.Provider value={user}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppRouter loginUser={loginUser} signOutUser={signOutUser} />
            </ThemeProvider>
        </AuthContext.Provider>
    </React.StrictMode>
}

export default App;
