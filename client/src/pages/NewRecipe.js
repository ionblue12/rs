
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const NewRecipe =()=>{
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleTitle = (e) => setTitle(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleImage = (e) => setImage(e.target.value);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        

        const response = await fetch('http://localhost:3002/api/recipes/addrecipe',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image_url: image,
            })
        });
        const responseJson = await response.json();
        if(!response.ok){
            setMessage(responseJson.error || 'Failed to add recipe')
            return;
        }
        setMessage(responseJson.message);
        setDescription('');
        setImage('');
        setTitle('');
    }


    return(
        <form onSubmit={handleSubmit}>
            <label>title</label>
            <input
            value={title}
            onChange={handleTitle}></input>
            <br></br>
            <label>description</label>
            <input
            value={description}
            onChange={handleDescription}></input>
            <br></br>
            <label>image_url</label>
            <input
            value={image}
            onChange={handleImage}></input>
            <br></br>
            <button>Submit</button>
        </form>
    )
}

export default NewRecipe;