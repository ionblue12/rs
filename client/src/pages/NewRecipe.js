
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const NewRecipe =()=>{

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues:{
            title: '',
            description: '',
            image_url: '',
            ingredients: [{ ingredient_name: '' }],
            steps: [{ instruction: '' }]
        }
    });

    const {fields: ingredientsFields, append: addIngredient, remove: removeIngredient} = useFieldArray({
        control,
        name: 'ingredients'
    });

    const {fields: stepsFields, append: addStep, remove: removeStep} = useFieldArray({
        control,
        name: 'steps'
    });


    

    const onSubmit = async(formData) =>{
        
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        const ingredientsPosition = formData.ingredients.map((item, index) => ({
            ingredient_name: item.ingredient_name,
            position: index + 1
        }));

        const stepsPosition = formData.steps.map((item, index) => ({
            instruction: item.instruction,
            step_number: index + 1
        }));
        

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
                ingredients: ingredientsPosition,
                steps: stepsPosition

            })
        });
        const responseJson = await response.json();
        if(!response.ok){
            setMessage(responseJson.error || 'Failed to add recipe')
            return;
        }
        setMessage(responseJson.message);
        reset();
    };

    const handleAddIngredient = (e, index) => {
        
        if(e.key === 'Enter'){
            e.preventDefault();
            if(index === ingredientsFields.length - 1){
                addIngredient({ ingredient_name: '' });
            }
        }
    };

    const handleAddStep = (e, index) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            if(index === stepsFields.length - 1){
                addStep({ instruction: '' });
            }
        }
    };


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <input {...register('title', {required: true})}></input>

            <br></br>

            <label>Description</label>
            <input
            {...register('description', {required: true})}
            ></input>
            
            <br></br>

            <label>image_url</label>
            <input
            {...register('image_url', {required: true})}
            ></input>
           
            <br></br>

            <h3>Ing</h3>
            {ingredientsFields.map((field, index)=> (
                <div key={field.id}>
                    <input
                        placeholder={`ingredient ${index + 1}`}
                        {...register(`ingredients.${index}.ingredient_name`)}
                        onKeyDown={(e) => handleAddIngredient(e, index)}
                    />
                    <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
                </div>
            ))}


                <br></br>


            <h3>Steps</h3>
            {stepsFields.map((field, index)=> (
                <div key={field.id}>
                    <input
                        placeholder={`step ${index + 1}`}
                        {...register(`steps.${index}.instruction`)}
                        onKeyDown={(e) => handleAddStep(e, index)}
                    />
                    <button type="button" onClick={() => removeStep(index)}>Remove</button>
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    )
}

export default NewRecipe;