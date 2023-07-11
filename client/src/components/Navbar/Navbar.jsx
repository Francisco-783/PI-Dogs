import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={style["navbar-container"]}>
            <Link to={"/dogs"} className={style["navbar-link"]}>
                Home
            </Link>
            <Link to={"/form"} className={style["navbar-link"]}>
            Create
            </Link>
        </div>
    );
};

export default Navbar;