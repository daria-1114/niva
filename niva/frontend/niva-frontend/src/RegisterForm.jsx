import { useState } from "react";

function RegisterForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:8081/api/auth/register",{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password,firstName,lastName}),
        });
        if(response.ok){
            alert('Registered successfully!');
        } else{
            const errorText = await response.text();
            alert("Registration failed: " + errorText);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="First name"
        value = {firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
        <input
        type="text"
        placeholder="Last name"
        value = {lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        </form>
    );
    }
    export default RegisterForm;