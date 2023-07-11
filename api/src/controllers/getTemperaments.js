const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament} = require('../db');

const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;


// Se define la función asíncrona getTemperaments
const getTemperaments = async () =>{
    // Se hace una llamada a la API y se espera a que se resuelva
    const allData = await axios.get(URL);
    // Se filtran los temperamentos de los perros y se crean arrays separados para cada uno
    let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
    // Se crea un array con los temperamentos únicos de todos los perros
    let eachTemperament = [...new Set(everyTemperament.flat())];
    // Se recorre cada temperamento para crearlo en la base de datos si no existe
    eachTemperament.forEach(el => {
        if (el) {
            Temperament.findOrCreate({
                where: { name: el }
            });
        }
    });
    // Se obtienen todos los temperamentos de la base de datos y se devuelven
    eachTemperament = await Temperament.findAll();
    return eachTemperament
}

// Se exporta la función getTemperaments
module.exports = getTemperaments