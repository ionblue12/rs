const { getAllRecipes, getRecipe, addRecipe, updateRecipe, removeRecipe } = require('./db/dbConnection');

const getRecipes =async (req, res)=>{
    try{
        const recipes = await getAllRecipes();
        res.status(201).send({ data: recipes.rows});
    } catch (err){
        return err;
    }
};



module.exports = {
    getRecipes,
}