import {RouterProvider} from "react-router-dom";
import React from "react";
import router from "./Router";

function App() {
    return <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
}

export default App;
