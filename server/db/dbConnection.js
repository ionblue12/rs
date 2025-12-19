import dotenv from 'dotenv';
dotenv.config();
import {Pool} from 'pg';
import { Client } from 'pg';


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

export const getAllRecipes = ()=> pool.query('SELECT * FROM recipes');

export const getRecipe = (id)=> pool.query('SELECT * FROM recipes WHERE id=$1 RETURNING *', [id]);

export const addRecipe = (title, description, steps, ingredients, image_url) => pool.query('INSERT INTO recipes (title, description, steps, ingredients, image_url) VALUES ($1, $2, $3, $4, $5)', [title, description, steps, ingredients, image_url]);

export const updateRecipe = (id, steps)=> pool.query('UPDATE recipes SET steps = $1 WHERE id = $2', [id, steps]);

export const removeRecipe = (id) => pool.query('DELETE FROM recipes WHERE id = $1 RETRUNING *', [id]);

