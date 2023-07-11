const { Router } = require('express');

const dogsRouter = require("./dogs")

const temperamentsRouter = require("./temperaments")


const mainRouter = Router();

mainRouter.use("/dogs", dogsRouter)
mainRouter.use("/temperaments", temperamentsRouter)



module.exports = mainRouter;
