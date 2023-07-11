const { API_KEY, } = process.env;
const axios = require('axios'); 
const { Dog, Temperament } = require("../db");

const getAllBDD = async () => {
// pido todos los perros de la BDD y incluyo todos los temperaments
    const allDogs = await Dog.findAll({
    include: [
        {
        model: Temperament,
        attributes: ["name"],
        through: {
            attributes: [],
        },
        },
    ],
    });
    allDogs.map(dog => {
        dog.height = `${dog.height[0]} - ${dog.height[1]} years`;
        dog.weight = `${dog.weight[0]} - ${dog.weight[1]}`;
        dog.life_span = `${dog.life_span[0]} - ${dog.life_span[1]}`;
    })
    return allDogs;
};

const getAllDogs = async () => {
    const dogsDB = await getAllBDD()
    
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`);
    const dogsAPI = await apiUrl.data?.map( e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            Temperaments: e.temperament,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            created: "false",
        };
    });
    return [...dogsDB, ...dogsAPI]
}

module.exports = getAllDogs;
