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

const addRecipe = (title, description, image_url) => pool.query('INSERT INTO recipes (title, description, steps, ingredients, image_url) VALUES ($1, $2, $3, $4, $5)', [title, description, steps, ingredients, image_url]);

const updateRecipe = (id, steps)=> pool.query('UPDATE recipes SET steps = $1 WHERE id = $2', [id, steps]);

const removeRecipe = (id) => pool.query('DELETE FROM recipes WHERE id = $1 RETRUNING *', [id]);

const findUser = (username)=> pool.query('SELECT * FROM users WHERE username=$1', [username]);

const getUserById = (id) => pool.query('SELECT id, username FROM users WHERE id =$1', [id]);

const addUser = (firstname, lastname, email, username, password_hash) => pool.query('INSERT INTO users (firstname, lastname, email, username, password_hash) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, username, password_hash]);

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
}