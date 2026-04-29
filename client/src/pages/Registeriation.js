import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';



const Registeriation=()=>{

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

    const onSubmit = async (e)=>{
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
        });

        if(error){
            setMessage(error.message || 'Registration failed');
            return;
        }
        setMessage("Registration successful!");
        setTimeout(() => {
            navigate('/allrecipes');
        }, 3000);
        
    };

    return(
        <form onSubmit={onSubmit}>
            <h2>Add New User</h2>
            {message && <div>{message}</div>}
            <label>Email </label>
            <input
            name='email'
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Password </label>
            <input
            name='password'
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            ></input>
            <br></br>
            <button>Submit</button>
            <p>{message}</p>
        </form>
    )
};

export default Registeriation;