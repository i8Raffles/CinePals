import {Outlet} from "react-router";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: "black",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
    padding: "5px 10px",
    marginRight: "10px",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    "&.active": {
      backgroundColor: "rgb(196, 114, 37)",
      color: "white"
    },
  }));

function UserContainer(props) {
    const { userId } = useParams();
    return (
        <div>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}> 
              <li>
              <StyledNavLink to={`/user/${userId}/profile`} activeclassname="active">User Profile</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to={`/user/${userId}/movies`} activeclassname="active">User Movies</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to={`/user/${userId}/reviews`} activeclassname="active">User Reviews</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to={`/user/${userId}/follows`} activeclassname="active">User Follows</StyledNavLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
}

export default UserContainer;
