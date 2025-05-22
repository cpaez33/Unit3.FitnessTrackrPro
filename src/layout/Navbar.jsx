import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        {token ? (
          <NavLink
            onClick={() => {
              logout();
            }}
            to="/login"
          >
            Log out
          </NavLink>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
