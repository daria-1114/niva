import { useState } from "react";

function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:8081/api/auth/login",{
            method:"POST",
            headers: {"Content-Type" : 'application/json'},
            body:JSON.stringify({email, password})
        });
        if(response.ok){
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert("Login successful")
        }else{
            const errorText = await response.text();
            alert('Login failed: '+errorText);
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}
export default LoginForm;