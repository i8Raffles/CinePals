import {Outlet, useMatch, useResolvedPath} from "react-router";
import {Button, Link} from "@mui/material";
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

function MyContainer(props) {
    return (
        <div>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}> 
              <li>
              <MyLink to="/my/profile">My Profile</MyLink>
              </li>
              <li>
              <MyLink to="/my/movies">My Movies</MyLink>
              </li>
              <li>
              <MyLink to="/my/reviews">My Reviews</MyLink>
              </li>
              <li>
              <MyLink to="/my/follows">My Follows</MyLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
}

export default MyContainer;
