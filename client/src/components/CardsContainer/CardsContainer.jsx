import {Card} from "../index"
import style from './CardsContainer.module.css';
import {useSelector} from "react-redux"
import { useState } from "react";
import { Paginado } from "../index";
import Loading from "../Loading/Loading";
import {Search_filters} from "../index"

const CardsContainer = () => {

const dogs = useSelector(state => state && state.dogs);
    const search = useSelector(state => state && state.search) 
    
    const filter1=  useSelector(state => state && state.filter1)
    const filter2=  useSelector(state => state && state.filter2)
    const filter3=  useSelector(state => state && state.filter3)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    if(!dogs && !search && !filter1 && !filter2 && !filter3){
        return  <Loading />
    }
//ORGANIZACION DE FILTROS
    const checkFilters= filter3.length > 0 ? filter3 : filter2
    const checkFilters2 = checkFilters.length > 0 ? checkFilters : filter1
    const checkFilters3 = checkFilters2.length > 0 ? checkFilters2 : dogs;
    const checkFilters4 = search.length > 0 ? search : checkFilters3;
    const show = checkFilters4.length > 0 ? checkFilters4: dogs;
//---------------------------------------------------------
// PAGINADO

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = show.slice(indexOfFirstDog, indexOfLastDog)
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
//-----------------------------------------------------
    return (

        <>
        <div className={style.filter_container}>
        <Search_filters setCurrentPage={setCurrentPage} />
        </div>
        <div className={style.paginado_container}>
        <Paginado dogsPerPage={dogsPerPage} dogs={show.length} paginado={paginado}/>
        {show.length === 0 ? <div> </div>:<div>{currentPage}</div>}
        </div>
        <div className={style.container_cards}>
        
        {dogs.length === 0 ? <Loading />:currentDog.map(dog => (
            <div className={style.row} key={dog.id}>
            <Card 
            className={style.card}
            
            id={dog.id}
            name={dog.name}
            image={dog.image}
            Temperaments={dog.Temperaments}
            weight={dog.weight}
            noFound={dog.noFound}
        />
        </div>
        ))}
        </div>
    </>
);
};


export default CardsContainer;