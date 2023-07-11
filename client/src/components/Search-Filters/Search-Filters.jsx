import { getDogsByName, filterCharacterByTemperament, filterByCreator, filterOrder } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {useSelector} from "react-redux"
import styles from './Search-Filters.module.css';



const Search_filters = ({setCurrentPage}) =>{
    const temperaments = useSelector(state=>state.temperaments)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    
    const searchHandler = () => {
        setCurrentPage(1)
        dispatch(getDogsByName(search))
        dispatch(filterByCreator("All"))
        dispatch(filterOrder("All"))
        dispatch(filterCharacterByTemperament("All"))
    }
    const returnBack = () => {
        setCurrentPage(1)
        dispatch(getDogsByName("All"))
        dispatch(filterOrder("All"))
        dispatch(filterByCreator("All"))
        dispatch(filterCharacterByTemperament("All"))
        setSearch('')
    }
    const [Temperament, setTemperament] = useState("");
    const [Orden, setOrden] = useState("");
const handlerOrder = (e) => {
    setCurrentPage(1)
    setOrden(e.target.value)
    dispatch(filterOrder("All"))
    dispatch(filterOrder(e.target.value))
}
const handlerFilteredCreatedBy = (e) => {
    setCurrentPage(1)
    console.log(Temperament)
    dispatch(filterByCreator("All"))
    dispatch(filterByCreator(e.target.value))
    Temperament &&dispatch(filterCharacterByTemperament(Temperament))
    Orden && dispatch(filterOrder(Orden))
}
const handlerFilteredTemperaments = (e) => {
    setCurrentPage(1)
    setTemperament(e.target.value)
    dispatch(filterCharacterByTemperament("All"))
    dispatch(filterCharacterByTemperament(e.target.value))
    Orden && dispatch(filterOrder(Orden))
}
return(
    <div className={styles.container}>
        <div className={styles.searchContainer}><input autoComplete='off' onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" name="name" /><button onClick={searchHandler}> Search</button></div>
        
        <div className={styles.selectContainer}>
    <select className={styles.select} onChange={(e) => handlerFilteredCreatedBy(e)}>
        <option value="All">All</option>
        <option value="true">BDD</option>
        <option value="false">api</option>
    </select>
    <select className={styles.select} onChange={(e) => handlerFilteredTemperaments(e)}>
        <option value="All">All</option>
        {temperaments.map(tempe => {
        return(
            <option key={tempe.name} value={tempe.name}>{tempe.name}</option>
        )
        })}
    </select>
    <select className={styles.select} onChange={(e) => handlerOrder(e)}>
        <option value="All">All</option>
        <option value="scoreD">Higher weight</option>
        <option value="score">Lower weight</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        </select>
    <button className={styles.returnButton} onClick={returnBack}> See all items</button>
    </div>
    </div>
)
}

export default Search_filters;