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
    setRecipes(prev =>([...prev, jsonResponse]));
    setMessage(jsonResponse.message);
   }

   useEffect(()=>{
    showRecipes();
   }, [])

    return(
        <div>

        </div>
    )
}

export default Allrecipes;