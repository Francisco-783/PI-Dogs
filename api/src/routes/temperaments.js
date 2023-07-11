const express = require('express');
const temperamentsRouter = express.Router();
require('dotenv').config();
const getAlltemperaments = require("../handlers/temperamentsHandlers")



temperamentsRouter.use(express.json());

temperamentsRouter.get('/', getAlltemperaments);


module.exports = temperamentsRouter;