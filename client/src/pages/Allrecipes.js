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
    if(!response.ok) {
        setMessage(jsonResponse.error || "no recipes");
        return;
    }
    setRecipes(jsonResponse.data);
    setMessage(jsonResponse.message);
   };

   const handleDlete = async (id) => {
    const response = await fetch(`http://localhost:3002/api/recipes/${id}`,{
        method: 'DELETE',
        credentials: 'include',
    });
    const jsonResponse = await response.json();
    if(!response.ok){
        setMessage(jsonResponse.error || 'Failed to delete recipe');
        return;
    }
    setMessage(jsonResponse.message);
    showRecipes();
   };
    

   useEffect(()=>{
    showRecipes();
   }, [])

    return(
        <div>
            <h2>My Rec</h2>
            {recipes.length === 0 && <p>No Rec Found</p>}
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <img src={recipe.image_url} alt={recipe.title} />
                    <button onClick={()=>handleDlete(recipe.id)}>x</button>
                </div>
            ))}
        </div>
    )
}

export default Allrecipes;