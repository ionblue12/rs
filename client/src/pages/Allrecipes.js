import React, { useEffect, useState } from "react";


const Allrecipes =()=>{
    const [message, setMessage] = useState('');
    const [recipes, setRecipes] = useState([]);

   const showRecipes =async ()=>{
    const response = await fetch('http://localhost:3002/api/recipes/mine',
        {
            credentials: "include"
        }
    );
    const jsonResponse = await response.json();
    console.log('response', jsonResponse);
    if(!response.ok) {
        setMessage(jsonResponse.error || "no recipes");
        return;
    }
    setRecipes(prev =>([...prev, jsonResponse.data]));
    setMessage(jsonResponse.message);
   }

   useEffect(()=>{
    showRecipes();
    console.log('all recipes', recipes);
   }, [])

    return(
        <div>
            <h2>My Rec</h2>
            {recipes.length === 0 && <p>No Rec Found</p>}
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <img>{recipe.image_url}</img>
                </div>
            ))}
        </div>
    )
}

export default Allrecipes;