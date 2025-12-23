const express = require('express');
const { getRecipes, getRecipeId } = require('./serverFunctions');
const router = express.Router();


router.get('/recipes', getRecipes);
router.get('/recipes/:Id', getRecipeId)





module.exports = router;