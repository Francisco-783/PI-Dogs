const {Dog} = require("../db")


const dogsMaker = async (name, image, height, weight, life_span, temperaments) =>{
    const newDog = await Dog.create({
        name, image, height, weight, life_span
    }) //crea en la tabla de dogs
    newDog.addTemperaments(temperaments) //añade los temperamentos a la lista intermedia

    return newDog;
}

module.exports= dogsMaker