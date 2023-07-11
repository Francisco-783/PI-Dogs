import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDogs, getTemperaments, cleanDetail } from '../../redux/actions';
import {CardsContainer,} from "../../components/index"
import style from "./Dogs.module.css";

const Dogs = () => {
    const Dispatch = useDispatch();
    useEffect(()=>{
    Dispatch( getDogs())
    Dispatch( getTemperaments())
    Dispatch( cleanDetail())
},[])
    return (
        <div className={style.container}>
        
        <CardsContainer />
        </div>
    )
}

export default Dogs