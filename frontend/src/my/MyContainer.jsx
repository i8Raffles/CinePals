import {Outlet} from "react-router";
import { Link } from "react-router-dom";

function MyContainer(props) {
    return (
        <div>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}> 
              <li style={{
              marginRight: "10px",
              backgroundColor: "lightgrey",
              borderRadius: "5px",
              padding: "5px 10px",
            }}>
                <Link to="/my/profile">My Profile</Link>
              </li>
              <li style={{
              marginRight: "10px",
              backgroundColor: "lightgrey",
              borderRadius: "5px",
              padding: "5px 10px",
            }}>
                <Link to="/my/movies">My Movies</Link>
              </li>
              <li style={{
              marginRight: "10px",
              backgroundColor: "lightgrey",
              borderRadius: "5px",
              padding: "5px 10px",
            }}>
                <Link to="/my/reviews">My Reviews</Link>
              </li>
              <li style={{
              marginRight: "10px",
              backgroundColor: "lightgrey",
              borderRadius: "5px",
              padding: "5px 10px",
            }}>
                <Link to="/my/follows">My Follows</Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
}

export default MyContainer;
