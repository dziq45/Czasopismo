import React,{useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import '../css/Register.css'
const Login = (props) => {
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    let history = useHistory()

    const handleSubmit=async(e)=>{
        //props.setLoggedIn(true)
        e.preventDefault()
        let ll = loginText
        const response = await axios.post('/Login',{
            login:loginText,
            password:passwordText,
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
                <p><b>Logowanie</b></p>
            </div>
             <form noValidate onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>{setLoginText(e.target.value)}} placeholder="Login"></input><br></br>
                <input type="password" onChange={(e)=>{setPasswordText(e.target.value)}} placeholder="Hasło"></input><br></br>
                <input className='submitBtn' type="submit" value="Zaloguj"></input><br></br>
             </form>
         </div>
     );
}
 
export default Login;