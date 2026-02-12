import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
const Registeriation=()=>{

    const [userInfo, setuserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
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
        try{
            const response = await fetch('http://localhost:3002/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
                username: userInfo.username,
                password: userInfo.password,
            })
        });
        
        const jsonResponse = await response.json();

        if(!response.ok){
            setMessage(jsonResponse.error || 'Registeriation failed');
            return;
        }
        setMessage(jsonResponse.message);
        navigate('/recipes', {
            user: jsonResponse.user
        })
       

        setuserInfo({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    });

    
    }catch(error){
        setMessage('Error adding user. Please try again');
    }
    }; 
    return(
        <form onSubmit={onSubmit}>
            <h2>Add New User</h2>
            {message && <div>{message}</div>}
            <label>First Name </label>
            <input 
            name='firstname'
            type="text"
            value={userInfo.firstname}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Last Name </label>
            <input
            name='lastname'
            type="text"
            value={userInfo.lastname}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Email </label>
            <input
            name='email'
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Username </label>
            <input
            name='username'
            type="text"
            value={userInfo.username}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Password </label>
            <input
            name='password'
            type="text"
            value={userInfo.password}
            onChange={handleChange}
            ></input>
            <br></br>
            <button>Submit</button>
        </form>
    )
};

export default Registeriation;