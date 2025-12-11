const pool = require('./db');

export const getAllRecipes = ()=> pool.query('SELECT * FROM recipes');

export const getRecipe = (id)=> pool.query('SELECT * FROM recipes WHERE id=$1 RETURNING *', [id]);

export const addRecipe = (title, description, steps, ingredients, image_url) => pool.query('INSERT INTO recipes (title, description, steps, ingredients, image_url) VALUES ($1, $2, $3, $4, $5)', [title, description, steps, ingredients, image_url]);

export const updateRecipe = (id, steps)=> pool.query('UPDATE recipes SET steps = $1 WHERE id = $2', [id, steps]);

export const removeRecipe = (id) => pool.query('DELETE FROM recipes WHERE id = $1 RETRUNING *', [id]);



