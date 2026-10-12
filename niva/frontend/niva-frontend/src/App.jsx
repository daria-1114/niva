import { useState } from 'react'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const App = ()=>{
  return(
   <div>
      <h1>Niva</h1>
      <RegisterForm />
      <hr />
      <LoginForm />
    </div>
  )
}
export default App