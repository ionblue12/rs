import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';


const Login = ()=>{
    const [userInfo, setuserInfo] = useState({
            email: '',
            password: '',
           
        });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    
    const handleChange = (e)=> {
        const { name, value } = e.target;
        setuserInfo((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password,
        });

        if(error){
            setMessage(error.message || 'Login Failed');
            return;
        }
        setMessage("Login successful!");
        setTimeout(() => {
            
            navigate('/allrecipes');
        }, 3000);

    }

    
    return(
        <form onSubmit={handleSubmit}>
            <h1>Please Login</h1>
            <label>Email </label>
            <input
            name="email"
            type='email'
            value={userInfo.email}
            onChange={handleChange}
            required
            ></input>
            <br></br>
            <input
            name="password"
            type='password'
            value={userInfo.password}
            onChange={handleChange}
            required
            ></input>
            <br></br>
            <button>Login</button>
            {message && <p style={{ color: "red" }}>{message}</p>}
        </form>
    )
}

export default Login;