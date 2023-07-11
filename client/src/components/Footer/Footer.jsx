import style from "./Footer.module.css";
import React from "react";
import logoGithub from './github-mark-white.png'
import logoLinkedin from "./linkedin-icon-18-256.png"




const Footer = () => {
    return (
        <footer className={style.container}>
        <a href="https://github.com/Francisco-783/PI-Dogs" className={style.a}>
        <img src={logoGithub} alt="Logo" className={style.image} />
        </a>
        <a href="https://www.linkedin.com/in/francisco-insaurralde-539109220/" className={style.a}>
        <img src={logoLinkedin} alt="Logo" className={style.image} />
        </a>
        </footer>)
}

export default Footer;