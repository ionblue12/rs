import React, { useState } from "react";

const Registeriation=()=>{

    const [userInfo, setuserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e)=> {
        const { name, value} = e.target;
        setuserInfo((prev) => ({...prev, [name]: value}));
    };

    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log('info', userInfo);
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
        console.log('Data', jsonResponse);

        setuserInfo({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });
    }catch(err){
        console.error({err: 'Somthing went wrong'});
    }
    }; 
    return(
        <form onSubmit={onSubmit}>
            <label>First Name </label>
            <input 
            type="text"
            value={userInfo.firstname}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Last Name </label>
            <input
            type="text"
            value={userInfo.lastname}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Email </label>
            <input
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Username </label>
            <input
            type="text"
            value={userInfo.username}
            onChange={handleChange}
            ></input>
            <br></br>
            <label>Password </label>
            <input
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