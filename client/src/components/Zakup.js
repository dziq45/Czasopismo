import Register from './Register'
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Payment from './Payment'
import {useHistory} from 'react-router-dom'

import '../css/Zakup.css'
const Zakup = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)
    const [mode, setMode] = useState(false) //false = subskrypcja true = zamówienie
    const [egzemplarzePdf, setEgzemplarzePdf] = useState([])
    const [egzemplarzeDruk, setEgzemplarzeDruk] = useState([])
    const [subskrypcja, setSubskrypcja] = useState('0')

    useEffect(()=>{
        setEgzemplarzePdf(JSON.parse(localStorage.getItem('egzemplarzePdf')))
        setEgzemplarzeDruk(JSON.parse(localStorage.getItem('egzemplarzeDruk')))
        setSubskrypcja(localStorage.getItem('subkskrypcja'))
        if(localStorage.getItem('subskrypcja') == '0'){
            setMode(true)
        }
    },[])

    const howMany =()=>{
        let sum = 0
        egzemplarzeDruk.forEach(element => {
            sum +=element.howMany
        });
        egzemplarzePdf.forEach(element=>{
            sum+=element.howMany
        })
        return sum
    }

    const howMuch=()=>{
        let sum = 0
        egzemplarzeDruk.forEach(element => {
            sum +=element.howMany*element.cena
        });
        egzemplarzePdf.forEach(element=>{
            sum+=element.howMany*element.cena
        })
        return sum
    }
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


    const expanededBasket=()=>(
        <div className='expandedBasketContainer'>
            <div className='expandedBasketLabel'>
                <p>Lp.</p>
                <p>Data wydania / Wersja</p>
                <p>Ilość</p>
                <p>Cena</p>
            </div>
            {egzemplarzeDruk.map((item,i,arr)=>
            <div className='basketItem' key={i}>
                <p>{i+1}</p>
                <p>{item.datawydania.substring(0,10)} / {item.wersja}</p>
                <div><p>{item.howMany}</p></div>
                <p>{item.howMany*item.cena}zł</p>
                
            
            </div>)}
            {egzemplarzePdf.map((item,i,arr)=>
            <div className='basketItem' key={i}>
                <p>{i+egzemplarzeDruk.length+1}</p>
                <p>{item.datawydania.substring(0,10)} / {item.wersja}</p>
                <div><p>{item.howMany}</p></div>
                <p>{item.howMany*item.cena}zł</p>
            </div>)}
            <div className='razemPodsumowanie'>Razem: {howMuch()}zł</div>
        </div>)

    return ( 
        <div>
        {mode? expanededBasket():'siema'}
        {!props.loggedIn? goToLogin?logowanie() : rejestracja() : <Payment></Payment>}
    </div> );
}
 
export default Zakup