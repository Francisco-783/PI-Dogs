import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDetails } from "../../redux/actions";
import {useParams} from 'react-router-dom'
import {DetailsCard} from "../../components/index"
import { useSelector } from "react-redux";
import "./Details.module.css"
import style from "./Details.module.css";
import Loading from "../../components/Loading/Loading";


const Details = () => {
    const {id} = useParams();
    const Dispatch = useDispatch();
    
    
    useEffect( async()=>{
        Dispatch( await getDetails(id))
    },[id])
    var details = useSelector(state => state && state.details)
    if (!details){
        return <Loading/>
    }
    if ( details.Temperaments){details.temperament = details.Temperaments;}
    return (
    <div key={id} className={style.container}>
        {details.length==0 ? <Loading/> :<DetailsCard 
        key={details.id}
        id={details.id}
        name={details.name}
        image={details.image}
        Temperaments={details.temperament}
        life_span={details.life_span}
        height={details.height}
        weight={details.weight}></DetailsCard>}
        
    </div>
    )
}

export default Details;
