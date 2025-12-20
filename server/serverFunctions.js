const { getAllRecipes, getRecipe, addRecipe, updateRecipe, removeRecipe } = require('./db/dbConnection');

const getRecipes = async (req, res)=>{
    try{
        const recipes = await getAllRecipes();
        return res.status(201).json({ data: recipes.rows});
    } catch (err){
        console.error('getRecipes failed', err);
        return res.status(500).json({error: 'Failed to get recipes'});
    }
};



module.exports = {
    getRecipes,
}