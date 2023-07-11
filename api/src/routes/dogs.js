const { Router } = require('express');
const {getDogsHandler,
    postDogHandler,
    getDogDetailsHandler}  = require("../handlers/dogsHandlers")

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler) /*CONSEGUIR TODAS LOS PERROS Y BUSCALOS */

dogsRouter.post("/", postDogHandler) /*CREA PERROS*/

dogsRouter.get("/:id", getDogDetailsHandler) /*DEVUELVE LOS DETAILS DE EL PERRO POR ID */

module.exports = dogsRouter;