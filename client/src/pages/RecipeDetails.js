import React, {useState, useParams, useEffect} from "react";

const RecipeDetails =() =>{
    const [message, setMessage] = useState('');
    const { id } = useParams();
    console.log("id", id);

    const getIngredients = async () => {
        const response = await fetch(`http://localhost:3002/api/recipes/ingredients/${id}`, {
            credentials: 'include',
        });
        const jsonResponse = await response.json();
        console.log("ingredeinets",jsonResponse);
        if(!response.ok){
            setMessage(jsonResponse.error || 'Failed to fetch ingredients');
            return;
        }
        setMessage(jsonResponse.message);
    };
    useEffect(() => {
        getIngredients();
    }, [id]);

    return (
        <div>

        </div>
    )
}

export default RecipeDetails;