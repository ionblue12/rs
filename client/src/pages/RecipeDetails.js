import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
const RecipeDetails =() =>{
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const [ingredients, setIngredients] = useState([]);
    

    const getIngredients = async () => {
        const response = await fetch(`http://localhost:3002/api/recipes/ingredients/${id}`, {
            credentials: 'include',
        });
        const jsonResponse = await response.json();
        console.log("ingredeinets",jsonResponse.data);
        if(!response.ok){
            setMessage(jsonResponse.error || 'Failed to fetch ingredients');
            return;
        }
        setMessage(jsonResponse.message);
        setIngredients(jsonResponse.data);
    };
    useEffect(() => {
        getIngredients();
    }, [id]);

    const getSteps = async() = > {
        const response = await
    }

    return (
        <div>
            <h1>ing</h1>
            {ingredients.length === 0 && <p>No Ingredients</p>}
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.position}>{ingredient.ingredient_name}</li>
                ))}
            </ol>
            

        </div>
    )
}

export default RecipeDetails;