const express = require('express');
const { getRecipes } = require('./serverFunctions');
const router = express.Router();


router.get('/recipes', getRecipes);