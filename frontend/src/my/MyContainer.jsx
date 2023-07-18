import {Outlet} from "react-router";
import MyLink from "../components/MyLink";


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
