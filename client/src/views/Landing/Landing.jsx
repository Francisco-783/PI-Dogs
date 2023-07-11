//ACA VA EL BOTON PARA ENTRAR LA IMAGEN DE FORNDO Y EL TITULO "HENRY'S DOGS"
import { Link } from "react-router-dom";
import style from "./Landing.module.css";


const Landing = () => {
    return (
        <div className={style.container}>
          <h1>HENRY DOGS</h1>
          <Link to={"/dogs"} className={style.button}>
          Get in
          </Link>
        </div>
      );
    };

    export default Landing