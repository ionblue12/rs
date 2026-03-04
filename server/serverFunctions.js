const { getAllRecipes, getRecipe, addRecipe, updateRecipe, removeRecipe, getIngredients, addUser } = require('./db/dbConnection');
const bcrypt = require('bcrypt');

const getRecipes = async (req, res)=>{
    const user_id= req.user.id;
    try{
        const recipes = await getAllRecipes(user_id);
        return res.status(200).json({ data: recipes.rows});
    } catch (err){
        console.error('no Recipes', err);
        return res.status(500).json({error: 'Failed to get recipes'});
    }
};


const getRecipeId = async (req, res) =>{
    const { recipe_id } = req.params; 
    try {
         const recipe = await getRecipe(recipe_id);
         return res.status(201).json({date: recipe.rows});
    } catch(err){
        console.error("not found the ID", err);
        return res.status(500).json({error: "the id not found"});
    }
};

const showIngredientsId = async(req, res) =>{
    const { recipe_id } = req.params;
    try{
        const ingredient = await getIngredients(recipe_id);
        return res.status(201).json({data: ingredient.rows});
    } catch(err){
        console.error('failed to fetch ingredients', err);
        return res.status(501).json({error: 'the id not found'});
    }
};

const newUser = async(req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    try {
        await addUser(firstname, lastname, email, username, password_hash);
        return res.status(201).json({message: `${username} added to Recipes`});
    } catch(err){
        if(err.code == "23505"){
            res.status(409).json({error: "username or email already exists"})
        }
        return res.status(500).json({
            error: 'internal server error'
        });
        
    }
};


const deleteRecipeId = async(req, res) => {
    const { id } = req.params;
    try {
        await removeRecipe(id);
        return res.status(200).json({message: 'Recipe deleted successfully'});
    } catch(err){
        console.error('Failed to delete recipe', err);
        return res.status(500).json({error: 'Failed to delete recipe'});
    }
}
    

module.exports = {
    getRecipes,
    getRecipeId,
    showIngredientsId,
    newUser,
    deleteRecipeId,
}