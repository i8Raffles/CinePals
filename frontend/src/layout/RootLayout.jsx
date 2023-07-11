import {Container} from "@mui/material";
import AppBarComponent from "../components/AppBarComponent";
import {Outlet} from "react-router";

function RootLayout(props) {
    return <Container maxWidth={false} disableGutters>
        <AppBarComponent />
        <Container maxWidth="xl" sx={{ p: 2}}>
            <Outlet />
        </Container>
    </Container>
}

export default RootLayout;
