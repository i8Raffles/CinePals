import React, {useState} from "react";
import AppRouter from "./Router";

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
            <AppRouter loginUser={loginUser} signOutUser={signOutUser} />
        </AuthContext.Provider>
    </React.StrictMode>
}

export default App;
