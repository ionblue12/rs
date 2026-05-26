const { getAllRecipes, getRecipe, addRecipe, updateRecipe, removeRecipe, getIngredients, addUser, getRecipeById, addIngredients, addSteps } = require('./db/dbConnection');
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
         return res.status(201).json({data: recipe.rows});
    } catch(err){
        console.error("failed to fetch the steps", err);
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
};

const recipeById = async (req, res) =>{
    const { id } = req.params;
    try{
        const recipe = await getRecipeById(id);
        return res.status(201).json({data: recipe.rows});
    } catch(err){
        console.error('failed to fetch recipe', err)
        return res.status(501).json({error: 'no recipe id'});
    }
};

const newRecipe = async(req, res) => {
    const { title, description, image_url,ingredients, steps } = req.body;
    const user_id = req.user.id;
    try{
        const recipe = await addRecipe(title, description, image_url, user_id);
        
        if(ingredients && ingredients.length > 0){
            for(const ingredient of ingredients){
                await addIngredients(recipe.rows[0].id, ingredient.position, ingredient.ingredient_name);
            }
        };

        if(steps && steps.length > 0){
            for(const step of steps){
                await addSteps(recipe.rows[0].id, step.step_number, step.instruction);
            }
        };



        
        return res.status(201).json({message: `${title} added to your recipes`, data: recipe.rows});
    }catch(err){
        console.error('failed to add the new recipe', err);
        return res.status(500).json({error: 'no new recipe added'});
    }
}

    

module.exports = {
    getRecipes,
    getRecipeId,
    showIngredientsId,
    newUser,
    deleteRecipeId,
    recipeById,
    newRecipe,
}