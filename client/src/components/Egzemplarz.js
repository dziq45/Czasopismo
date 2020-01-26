import React from 'react'
import {Link} from 'react-router-dom'
import okladka from '../images/magazine.jpg'
import '../css/Egzemplarz.css'
const Egzemplarz = (props) => {
    return ( <div className='egzemplarzContainer'>
        <img src={okladka}></img>
        <p>{props.item.cena}zł</p>
        <p>Wersja: {props.item.wersja == 'druk'? 'drukowana': 'PDF'}</p>
        <button onClick={()=>props.addItem(props.item)}>Dodaj</button>
    </div> )
}
 
export default Egzemplarz;