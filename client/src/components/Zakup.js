import Register from './Register'
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Payment from './Payment'
import '../css/Zakup.css'
const Zakup = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)
    const [egzemplarzePdf, setEgzemplarzePdf] = useState([])
    const [egzemplarzeDruk, setEgzemplarzeDruk] = useState([])

    useEffect(()=>{
        setEgzemplarzePdf(JSON.parse(localStorage.getItem('egzemplarzePdf')))
        setEgzemplarzeDruk(JSON.parse(localStorage.getItem('egzemplarzeDruk')))
    },[])
    const rejestracja=()=>(<div className='containerRejestracja'>
        <Register toPath='/Zakup' loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}></Register>
        <div>lub</div>
        <div className='changeToOther' onClick={()=>setGoToLogin(!goToLogin)}>Zaloguj się</div>
    </div>)
    const logowanie=()=>(<div className='containerRejestracja'>
        <Login toPath='/Zakup' loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}></Login>
        <div>lub</div>
        <div className='changeToOther' onClick={()=>setGoToLogin(!goToLogin)}>Zarejestruj się</div>
    </div>)


    return ( 
        <div>
        {!props.loggedIn? goToLogin?logowanie() : rejestracja() : <Payment></Payment>}
        {}
        
    </div> );
}
 
export default Zakup