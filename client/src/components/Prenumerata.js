import React, { useEffect } from 'react';
import '../css/Prenumerata.css'
import magazine from '../images/magazine.jpg'
import {Link} from 'react-router-dom'

const Prenumerata = () => {
    useEffect(()=>{
        localStorage.setItem('subskrypcja', 0)
    },[])
    return ( <div>
        <div className='powitanieContainer'>
            <p><b>Witamy w naszym sklepie internetowym.</b></p>
            <p>Aby kontynuować zakupy wybierz interesujący cię dział</p>
            <p>Aby przeglądać zakupione wydawnictwa oraz historię zamówień, zaloguj się na swoje konto.</p>
        </div>
        <div className='flexboxContainer'>
            <div className='flexboxItem'>
                <Link to='/subskrypcja'>
                    <img src={magazine} width='100'/>
                    <p>Prenumerata</p>
                </Link>
            </div> 
            <div className='flexboxItem'>
                <Link to='egzemplarze'>
                    <img src={magazine} width='100'/>
                    <p>Pojedyncze egzemplarze</p>
                </Link>
                
            </div> 
            <div className='flexboxItem'>
                <img src={magazine} width='100'/>    
                <p>Egzemplarze archiwalne</p>
            </div> 
        </div>

    </div>
        
     );
}
 
export default Prenumerata;