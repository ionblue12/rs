const dotenv = require('dotenv');
dotenv.config();

const { Pool, Client } = require('pg');


const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
})


client.connect()
.then(() => {console.log('Connected to PostgreSQL');
    client.end();
})
.catch(err => console.error('Error connecting to the database: ', err));



const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

const getAllRecipes = (user_id)=> pool.query('SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);

const getRecipe = (recipe_id)=> pool.query('SELECT * FROM recipe_steps WHERE recipe_id=$1', [recipe_id]);

const getIngredients = (recipe_id) => pool.query('SELECT * FROM ingredients WHERE recipe_id = $1', [recipe_id]);

const addRecipe = (title, description, image_url, user_id) => pool.query('INSERT INTO recipes (title, description, steps, ingredients, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [title, description, steps, ingredients, image_url, user_id]);

const addIngredients = (recipe_id, position, ingredient_name) => pool.query('INSERT INTO INGREDIENTS (recipe_id, position, ingredient_name) VALUES ($1, $2, $3)', [recipe_id, position, ingredient_name]);

const addSteps = (recipe_id, step_number, instruction) => pool.query('INSERT INTO recipe_steps (recipe_id, step_number, instruction) VALUES ($1, $2, $3)', [recipe_id, step_number, instruction]);

const updateRecipe = (id, steps)=> pool.query('UPDATE recipes SET steps = $1 WHERE id = $2', [id, steps]);

const removeRecipe = (id) => pool.query('WITH deleted_recipe AS (DELETE FROM recipes WHERE id = $1 RETURNING id), deleted_ingredients AS (DELETE FROM ingredients WHERE recipe_id IN (SELECT id FROM deleted_recipe)) DELETE FROM recipe_steps WHERE recipe_id IN (SELECT id FROM deleted_recipe)', [id]);

const findUser = (username)=> pool.query('SELECT * FROM users WHERE username=$1', [username]);

const getUserById = (id) => pool.query('SELECT id, username FROM users WHERE id =$1', [id]);

const addUser = (firstname, lastname, email, username, password_hash) => pool.query('INSERT INTO users (firstname, lastname, email, username, password_hash) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, username, password_hash]);

const getRecipeById = (id) => pool.query('SELECT * FROM recipes WHERE id = $1', [id]);

module.exports ={
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    removeRecipe,
    getIngredients,
    findUser,
    getUserById,
    addUser,
    getRecipeById,
    addIngredients,
    addSteps,
    
}