import {Outlet} from "react-router";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyLink from "../components/MyLink";

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
              <MyLink to={`/user/${userId}/profile`} >User Profile</MyLink>
              </li>
              <li>
              <MyLink to={`/user/${userId}/movies`} >User Movies</MyLink>
              </li>
              <li>
              <MyLink to={`/user/${userId}/reviews`} >User Reviews</MyLink>
              </li>
              <li>
              <MyLink to={`/user/${userId}/follows`} >User Follows</MyLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
}

export default UserContainer;
