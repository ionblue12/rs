const express = require('express');
const { getRecipes, getRecipeId, showIngredientsId } = require('./serverFunctions');
const router = express.Router();


router.get('/recipes', getRecipes);
router.get('/recipes/:recipe_id', getRecipeId);
router.get('/recipes/ingredients/:recipe_id', showIngredientsId);





module.exports = router;