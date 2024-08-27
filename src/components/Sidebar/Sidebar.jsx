import { NavLink } from "react-router-dom";
import { SiAwssecretsmanager } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";

import classes from "./style.module.css";
import Avatar from "../Avatar/Avatar";
import { auth } from "../../firebase/config";

export default function Sidebar() {
  const user = auth.currentUser;

  return (
    <div className={classes.sidebar}>
      <div className={classes["sidebar-content"]}>
        <div className={classes.user}>
          {user && (
            <>
              <Avatar src={user?.photoURL} />
              <p>Hey {user?.displayName}</p>
            </>
          )}
        </div>
        <nav className={classes.links}>
          <ul>
            <li>
              <NavLink to="/">
                <SiAwssecretsmanager size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <IoIosAddCircle size={20} />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
