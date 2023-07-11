
import axios from "axios";



export const GET_DOGS = "GET_DOGS"

export const getDogs = () => {
    try{return async function (dispatch) {
        const dogsReq = (await axios.get(
            "http://localhost:3001/dogs"
        ));
        const dogs = await dogsReq.data;
        dogs.map(dog => {
            if (Array.isArray(dog.Temperaments)){
                var temperamentNames = dog.Temperaments.map(temperament => temperament.name);
                var temperamentString = temperamentNames.join(', ');
                dog.Temperaments = temperamentString
            }
        })

        return(dispatch({type: GET_DOGS, payload: dogs}))
    }}
    catch(error){
        console.log(error.message)
    }
}

export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"

export const getTemperaments = () => {
    try{return async function (dispatch) {
        const tempreq = (await axios.get(
            "http://localhost:3001/temperaments"
        ));
        const temperaments = await tempreq.data;
        return(dispatch({type: GET_TEMPERAMENTS, payload: temperaments}))
    }}
    catch(error){
        console.log(error.message)
    }
}

export const GET_DETAILS= "GET_DETAILS"

export const getDetails = (id) => {
    try{return async function (dispatch){
        const dogReq = (await axios.get(
            `http://localhost:3001/dogs/${id}`
        ));
        const dog = await dogReq.data;

        if (Array.isArray(dog.Temperaments)){
            var temperamentNames = dog.Temperaments.map(temperament => temperament.name);
            var temperamentString = temperamentNames.join(', ');
            dog.Temperaments = temperamentString
        }
        return (dispatch({type: GET_DETAILS, payload: dog}))
    } }
    catch(error){
        console.log(error)
    }
}

export const FILTER_BY_NAME = "FILTER_BY_NAME"

export const getDogsByName = (name) => async(dispatch) => {
    try {
        const noFound = [{

            "noFound": true,
        }]
        if (name === ""){
            return dispatch({ type: FILTER_BY_NAME, payload: noFound })
        }
        else if (name === "All"){
            return dispatch({ type: FILTER_BY_NAME, payload: [] })
        }
        else{
        const response = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        const data = response.data
        const result = data.length > 0 ? data : noFound
        return dispatch({ type: FILTER_BY_NAME, payload: result })}
    } catch (error) {
        console.log(error)  
    }
}

export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"

export const filterCharacterByTemperament = (temperament) => ({type: FILTER_BY_TEMPERAMENT, payload:temperament})

export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR"

export const filterByCreator = (boolean) => ({type: FILTER_BY_CREATOR, payload:boolean})

export const FILTER_BY_ORDER = "FILTER_BY_ORDER"

export const filterOrder = (order) => ({type: FILTER_BY_ORDER, payload:order})

export const CLEAN_DETAIL = "CLEAN_DETAIL"

export const cleanDetail = () => ({type: CLEAN_DETAIL, payload:[]})

