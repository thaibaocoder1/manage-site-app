import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/react.svg";
import classes from "./style.module.css";
import { useLogout } from "../../hooks/useLogout";
import { auth } from "../../firebase/config";

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const user = auth.currentUser;

  return (
    <nav className={classes.navbar}>
      <ul>
        <Link className={classes.logo} to="/">
          <img src={icon} alt="React logo" />
          <span>The Manage Site</span>
        </Link>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        {user?.uid && (
          <li>
            <button
              className="btn"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
              disabled={isPending}
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
