import {Outlet} from "react-router";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

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
    backgroundColor: "rgb(25, 118, 210)",
    color: "white"
  },
}));

function MyContainer(props) {
    return (
        <div>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}> 
              <li>
              <StyledNavLink to="/my/profile" activeClassName="active">My Profile</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to="/my/movies" activeClassName="active">My Movies</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to="/my/reviews" activeClassName="active">My Reviews</StyledNavLink>
              </li>
              <li>
              <StyledNavLink to="/my/follows" activeClassName="active">My Follows</StyledNavLink>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
}

export default MyContainer;
