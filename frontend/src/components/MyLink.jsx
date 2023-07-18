import {useMatch, useResolvedPath} from "react-router";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

function MyLink(props) {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <Button color={match ? "primary" : "inherit"}
                   component={NavLink}
                   to={props.to}>
        {props.children}
    </Button>
}

export default MyLink;