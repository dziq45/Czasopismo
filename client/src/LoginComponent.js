import React,{useState} from 'react';
import './Login.css';
import axios from 'axios'

const LoginComponent = ()=>{
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [success, setSuccess] = useState(null)
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const response = await axios.post('/posting',{
            login:loginText,
            password:passwordText
        })
        console.log(response)
    }
    const handleChangeLogin=(event)=>{
        setLoginText(event.target.value)
    }
    const handleChangePassword=(event)=>{
        setPasswordText(event.target.value)
    }
    return(
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Login
                    <input type="text" value={loginText} onChange={handleChangeLogin} />
                </label>
                <label><br></br>
                    Hasło
                    <input type="text" value={passwordText} onChange={handleChangePassword} />
                </label><br></br>
                <input type="submit" value="Wyślij" />
            </form>
            {success}            
        </div>
    )
}

export default LoginComponent