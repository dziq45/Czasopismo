import React,{useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import '../css/Register.css'

 const Register = (props) => {
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [emailText, setEmailText] = useState('')
    const [password2Text, setPassword2Text] = useState('')
    let history = useHistory()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const ll = loginText
        const response = await axios.post('/Register',{
            login:loginText,
            email:emailText,
            password:passwordText,
            password2:password2Text
        })
        if(response.data.isGut){
            localStorage.setItem('login', ll)
            props.setLoggedIn(true)
            history.push(props.toPath)
        }
    }
     return ( 
         <div className='formContainer'>
             <div className='formName'>
                <p><b>Rejestracja</b></p>
            </div>
             <form noValidate onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>{setLoginText(e.target.value)}} placeholder="Login"></input><br></br>
                <input type="email" onChange={(e)=>{setEmailText(e.target.value)}} placeholder="Email"></input><br></br>
                <input type="password" onChange={(e)=>{setPasswordText(e.target.value)}} placeholder="Hasło"></input><br></br>
                <input type="password" onChange={(e)=>{setPassword2Text(e.target.value)}} placeholder="Hasło"></input><br></br>
                <input className='submitBtn' type="submit" value="Zarejestruj"></input><br></br>
             </form>
         </div>
      );
 }
  
 export default Register;