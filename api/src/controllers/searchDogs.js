const { Dog } = require("../db");
const axios = require('axios'); 
const getAllDogs = require("./getAllDogs")

const searchDogs = async (req) => {
    let result = await getAllDogs()
    const resultDogName = result.filter(
        e => e.name.toLowerCase().includes(req.toLowerCase()))
    return resultDogName;
}
module.exports =  searchDogs;
