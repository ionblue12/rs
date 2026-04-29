import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';


const Login = ()=>{
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    
    const handleChange = (e)=>{
        setEmail(e.target.value);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(loading) return;
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    emailRedirectTo: 'http://localhost:3000/allrecipes'
                },
            })
            
            if(error){
                setMessage(error.message || 'Login failed');
                return;
            }
            setMessage(" Check your email for the login link");
            
            
        }catch(error){
            setMessage('Username or password wrong')
        }

    }

    
    return(
        <form onSubmit={handleSubmit}>
            <h1>Please Login to see your Recipes</h1>
            <label>Email </label>
            <input
            type='email'
            value={email}
            onChange={handleChange}
            required
            ></input>
            <br></br>
            <button disabled={loading}>{loading? "Sending..." : "Login"}</button>
        </form>
    )
}

export default Login;