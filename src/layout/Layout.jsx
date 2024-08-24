import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import classes from "./style.module.css";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className={classes.App}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
