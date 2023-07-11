import {GET_DOGS, GET_TEMPERAMENTS, GET_DETAILS, FILTER_BY_NAME, FILTER_BY_TEMPERAMENT, FILTER_BY_CREATOR, FILTER_BY_ORDER, CLEAN_DETAIL} from "./actions"

const initialState = {
    dogs: [],
    details: [],
    temperaments: [],
    search: [],
    filter1: [],
    filter2: [],
    filter3: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case CLEAN_DETAIL:
            return {...state, details:[]};
        case GET_DOGS:
            return {...state, dogs:action.payload};
        case GET_TEMPERAMENTS:
            return {...state, temperaments:action.payload}
        case GET_DETAILS:
            return {...state, details:action.payload}
        case FILTER_BY_NAME:
            return {...state, search:action.payload}
        case FILTER_BY_CREATOR:
            const noFound = [{
            "noFound": true,
        }]
            const DogsAll = state.dogs;   
            const createdByFilter = action.payload === "true" ? DogsAll.filter(dog => dog.created === "true") : DogsAll.filter(dog => dog.created === "false");
            const show = createdByFilter.length>0 ? createdByFilter : noFound;
            return {...state, 
            filter1: action.payload === "All" ? [] : show};
        case FILTER_BY_TEMPERAMENT:
            const everyDogs = (state.filter1.length > 0) ? state.filter1 : state.dogs;
            console.log(everyDogs)
            const temperamentFiltered = action.payload === "All" ? [] : everyDogs.filter(dog => dog.Temperaments?.includes(action.payload));
            return {...state, 
            filter2: temperamentFiltered
            };
        case FILTER_BY_ORDER:
            const CheckFilter1 = (state.filter2.length > 0) ? state.filter2 : state.filter1;
            const FullDogs = (CheckFilter1.length > 0) ? CheckFilter1 : state.dogs;
            let property = (action.payload === "score" || action.payload === "scoreD") ? "weight" : "name";
            let orientation = action.payload === "score" || action.payload === "asc" ? "up" : "down"
            let order = [];
            if (action.payload === 'All'){ 
                order = []
            }else if(orientation === 'up'){
                order = FullDogs.sort((firstEl, secondEl) =>{
                    if (firstEl[property] > secondEl[property]) return 1
                    if (firstEl[property] < secondEl[property]) return -1
                    //Si ninguna de los dos if anteriores se cumple retorna aqui
                } )
            }else if(orientation === 'down'){
                order = FullDogs.sort((firstEl, secondEl) =>{
                    if (firstEl[property] > secondEl[property]) return -1
                    if (firstEl[property] < secondEl[property]) return 1
                    //Si ninguna de los dos if anteriores se cumple retorna aqui
                } )
            }
            return {...state, 
            filter3: order
            };
            }}

export default rootReducer;