import { Link } from "react-router-dom";
import icon from "../../assets/react.svg";
import classes from "./style.module.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
