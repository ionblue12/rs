
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const NewRecipe =()=>{

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    

    const onSubmit = async(formData) =>{
        
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
                title: formData.title,
                description: formData.description,
                image_url: formData.image_url,
            })
        });
        const responseJson = await response.json();
        if(!response.ok){
            setMessage(responseJson.error || 'Failed to add recipe')
            return;
        }
        setMessage(responseJson.message);
        reset();
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <input {...register('title', {required: true})}></input>
            {errors.title && <p>{errors.title.message}</p>}
            <label>Description</label>
            <input
            {...register('description', {required: true})}
            ></input>
            {errors.description && <p>{errors.description.message}</p>}
            <br></br>
            <label>image_url</label>
            <input
            {...register('image_url', {required: true})}
            ></input>
            {errors.image_url && <p>{errors.image_url.message}</p>} 
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewRecipe;