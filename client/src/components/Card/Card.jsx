import { Link } from "react-router-dom";
import style from './Card.module.css';

const Card = (props) => { 
    if (props.noFound){
        return <div className={style.noFound}>no se encontro ningun resultado</div>
    }

    return (
    <Link key={props.id}  to={`/dogs/${props.id}`} className={style.link}>
    <div     className={style.card}>
        <img src={props.image} alt={props.name} className={style.image}/>
        
        
        <div className={style.dataContainer}>
        <h2 className={style.name}>{props.name}</h2>
        <p className={style.temperaments}>Temperaments: {props.Temperaments}</p>
        <p className={style.weight}>Weight: {props.weight} KG</p>
        </div>
    </div></Link>)
}

export default Card;