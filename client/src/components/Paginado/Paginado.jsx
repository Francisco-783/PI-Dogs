import React from "react";
import style from './Paginado.module.css';


const Paginado = ({dogsPerPage, dogs, paginado}) => {
    var pageNumber = []

    for (let i = 0; i<Math.ceil(dogs/dogsPerPage); i++ ){
        pageNumber.push(i+1)
    }
    return (
        <nav className={style.all}>
            <ul className={style.container}>
                {
                    pageNumber &&
                    pageNumber.map(number => {
                        return <button className={style.button} onClick={() => paginado(number)} key={number}>{number}</button>
                    })
                }
            </ul>
        </nav>
    )
}
export default Paginado