const getTemperaments = require("../controllers/getTemperaments")

const getAlltemperaments = async (req, res) => {
    try{
        const results = await getTemperaments();
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = getAlltemperaments;



