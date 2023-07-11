const dogsMaker = require("../controllers/Dogsmaker")
const getAllDogs = require("../controllers/getAllDogs")
const searchDogs = require("../controllers/searchDogs")
const getDetailDog = require("../controllers/getDetailDog")


const getDogsHandler = async (req, res) => {
    const search = req.query.name;
try{
    const results = search ? await searchDogs(search) : await getAllDogs()  //si no existe una busqueda que entrege todas
    res.status(200).json(results)
} catch (error) {
    res.status(400).json({error: error.message})
}
  }
  
  const postDogHandler = async (req, res) => {
    try{
        const {name, image, height, weight, life_span, temperaments} = req.body;
        // Validaciones de NAME
        const errors = {};

    // Validaciones de NAME
    if (!name) {
      errors.name = "nombre obligatorio";
    }
    if (name.length < 4) {
      errors.name = "nombre muy corto";
    }
    // Validaciones de IMAGE
    if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(image)) {
      errors.image = "URL no valido";
    }
    if (image.length > 199) {
      errors.image = "URL muy largo";
    }
    // Validaciones de LIFE_SPAN
    if (life_span[0] > life_span[1]) {
      errors.life_span = "el minimo no puede ser mayor que el maximo (life_span)";
    }
    if (life_span[0] === life_span[1]) {
      errors.life_span = "el minimo y el maximo no pueden ser iguales (life_span)";
    }
    if (life_span[1] > 20) {
      errors.life_span = "20 años maximo (life_span)";
    }
    if (life_span.length < 2) {
      errors.life_span = "faltan datos (life_span)";
    }
    // Validaciones de HEIGHT
    if (height[0] > height[1]) {
      errors.height = "el minimo no puede ser mayor que el maximo (height)";
    }
    if (height[0] === height[1]) {
      errors.height = "el minimo y el maximo no pueden ser iguales (height)";
    }
    if (height[1] > 110) {
      errors.height = "110 centimetros maximo (height)";
    }
    if (height.length < 2) {
      errors.height = "faltan datos (height)";
    }
    // Validaciones de WEIGHT
    if (weight[0] > weight[1]) {
      errors.weight = "el minimo no puede ser mayor que el maximo (weight)";
    }
    if (weight[0] === weight[1]) {
      errors.weight = "el minimo y el maximo no pueden ser iguales (weight)";
    }
    if (weight[1] > 110) {
      errors.weight = "110 kilos maximo (weight)";
    }
    if (weight.length < 2) {
      errors.weight = "faltan datos (weight)";
    }
    // Validaciones de TEMPERAMENTS
    if (temperaments.length === 0) {
      errors.temperaments = "agregar minimo un temperamento";
    }

    if (Object.keys(errors).length > 0) {
      // Si hay errores, envía una respuesta con un mensaje de error y el objeto con los errores
      res.status(400).json({ message: 'Errores en los datos enviados', errors });
      return;
    }
    

    if (Object.keys(errors).length > 0) {}
        await dogsMaker(name, image, height, weight, life_span, temperaments);
        res.status(201).json("creado correctamente")
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
  }
  
  const getDogDetailsHandler = async (req, res) => {
    const id = req.params.id;
    try {
      const dog = await getDetailDog(id)
      res.status(201).json(dog)
    }
    catch (error){
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { getDogsHandler, postDogHandler, getDogDetailsHandler }