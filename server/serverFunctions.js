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


const getRecipeId = async (req, res) =>{
    const {recipe_id}  = req.params; 
    try {
         const recipe = await getRecipe(recipe_id);
         return res.status(201).json({date: recipe.rows});
    } catch(err){
        console.error("not found the ID", err);
        return res.status(500).json({error: "the id not found"});
    }
}


module.exports = {
    getRecipes,
    getRecipeId,
}