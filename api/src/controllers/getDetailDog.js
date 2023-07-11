const axios = require('axios'); 
const { Dog, Temperament } = require("../db");  

const getDetailDog = async (req) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var result = []
    if (!uuidPattern.test(req)){
        const dog = await axios.get(`https://api.thedogapi.com/v1/breeds/${req}`)
        const image = await axios.get(`https://api.thedogapi.com/v1/images/${dog.data.reference_image_id}   `)
        dog.data.image = image.data.url
        dog.data.height = dog.data.height.metric
        dog.data.weight = dog.data.weight.metric
        result = dog.data
    }
    else{
        result = await Dog.findByPk(req, {
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
            result.height = `${result.height[0]} - ${result.height[1]} years`;
            result.weight = `${result.weight[0]} - ${result.weight[1]}`;
            result.life_span = `${result.life_span[0]} - ${result.life_span[1]}`;
        }
        return result
    }
    


module.exports = getDetailDog