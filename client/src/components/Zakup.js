import Register from './Register'
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Payment from './Payment'
import {useHistory, Link} from 'react-router-dom'
import Wysylka from './daneWysylki'

import '../css/Zakup.css'
const Zakup = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)
    const [mode, setMode] = useState(false) //false = subskrypcja true = zamówienie
    const [egzemplarzePdf, setEgzemplarzePdf] = useState([])
    const [egzemplarzeDruk, setEgzemplarzeDruk] = useState([])
    const [subskrypcja, setSubskrypcja] = useState(0)
    const [wysylka, setWysylka] = useState(false)
    const [id, setId] = useState(null)

    useEffect(()=>{
        setEgzemplarzePdf(JSON.parse(localStorage.getItem('egzemplarzePdf')))
        setEgzemplarzeDruk(JSON.parse(localStorage.getItem('egzemplarzeDruk')))
        setSubskrypcja(parseInt(localStorage.getItem('subskrypcja')))
        console.log(`z zakupu ${localStorage.getItem('subskrypcja')}`)
        if(localStorage.getItem('subskrypcja') == 0){
            setMode(true)
            if(JSON.parse(localStorage.getItem('egzemplarzeDruk')).length>0){
                setWysylka(true)
            }
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

    const sub=()=>(
        <div className='powitanieContainer'>
            <p><b>Kupowana oferta: SUBSKRYPCJA NA OKRES {subskrypcja} MIESIĘCE ZA {subskrypcja*15}ZŁ</b></p>
            <p>Aby kontynuować zakupy wybierz interesującą cię ofertę płatności</p>
        </div> 
    )
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
        {mode? expanededBasket():sub()}
        {!props.loggedIn? goToLogin?logowanie() : rejestracja() :wysylka? <Wysylka setWysylka={setWysylka}></Wysylka> : 
        <>
        <Payment wartosc={mode? howMuch(): subskrypcja*15}></Payment>
        <Link to='/sukces'>Sukces</Link>
        <Link to='/porazka'>Porażka</Link>
        </>
        }
    </div> );
}
 
export default Zakup