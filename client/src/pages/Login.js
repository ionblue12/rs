import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [userinfo, setUserinfo] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserinfo((prev)=> ({...prev, [name]: value}));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    username: userinfo.username,
                    password: userinfo.password,
                })
            });
            const jsonResponse = await response.json();
            if(!response.ok){
                setMessage(jsonResponse.error || 'Login failed')
                return;
            }
            setMessage(jsonResponse.message);
            navigate('/allrecipes', {
                user: jsonResponse.user
            })
            setUserinfo({
                username: '',
                password: ''
            })
            
        }catch(error){
            setMessage('Username or password wrong')
        }

    }

    
    return(
        <form onSubmit={handleSubmit}>
            <h1>Please Login to see your Recipes</h1>
            <label>Username </label>
            <input
            name='username'
            type='text'
            value={userinfo.username}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Password </label>
            <input
            name='password'
            type='text'
            value={userinfo.password}
            onChange={handleChange}
            ></input>
            <br></br>
            <button>Login</button>
        </form>
    )
}

export default Login;