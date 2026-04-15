import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
const RecipeDetails =() =>{
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [recipes, setRecipes] = useState([]);
    
    const recipeId = async() =>{
        const response = await fetch(`http://localhost:3002/api/recipes/${id}`, {
            credentials: 'include',
        });
        const jsonResponse = await response.json();
        if(!response.ok){
            setMessage(jsonResponse.error || 'Failed to fetch recipe');
            return;
        }
        setMessage(jsonResponse.message);
        setRecipes(jsonResponse.data);
        
    };

    const getIngredients = async () => {
        const response = await fetch(`http://localhost:3002/api/recipes/ingredients/${id}`, {
            credentials: 'include',
        });
        const jsonResponse = await response.json();
        
        if(!response.ok){
            setMessage(jsonResponse.error || 'Failed to fetch ingredients');
            return;
        }
        setMessage(jsonResponse.message);
        setIngredients(jsonResponse.data);
    };

    const getSteps = async() =>{
        const response = await fetch(`http://localhost:3002/api/recipes/recipesteps/${id}`, {
            credentials: 'include',
        });
        const jsonResponse = await response.json();
        
        if(!response.ok){
            setMessage(jsonResponse.error || 'Failed to fetch steps');
            return;
        }
        setMessage(jsonResponse.message);
        setSteps(jsonResponse.data);
    }


    useEffect(() => {
        getIngredients();
        getSteps();
        recipeId();
    }, [id]);

    return (
        <div>
            {recipes.length === 0 && <p>No Recipe</p>}
            {recipes.map(recipe => (
                <h1 key={recipe.id}>{recipe.title}<img src={recipe.image_url} alt={recipe.title} /></h1>
            ))}
            <h1>Ingredients</h1>
            {ingredients.length === 0 && <p>No Ingredients</p>}
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.position}>{ingredient.ingredient_name}</li>
                ))}
            </ol>
            <h1>Steps</h1>
            {steps.length === 0 && <p>No Steps</p>}
            <ol>
                {steps.map(step =>(
                    <li key={step.step_number}>{step.instruction}</li>
                ))}
            </ol>
            <button>Edit</button>
            

        </div>
    )
}

export default RecipeDetails;