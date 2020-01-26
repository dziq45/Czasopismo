import React, { useState } from 'react';
import{Link, useHistory} from 'react-router-dom'
import '../css/Prenumerata.css'
import magazine from '../images/magazine.jpg'
import {useHisotry} from 'react-router-dom'
const Subskrypcja = () => {
    const[value, setValue] = useState('3')
    let history = useHistory()

    return ( <div>
        <div className='powitanieContainer'>
            <p><b>Witamy w naszym sklepie internetowym.</b></p>
            <p>Aby kontynuować zakupy wybierz interesujący cię dział</p>
            <p>Aby przeglądać zakupione wydawnictwa oraz historię zamówień, zaloguj się na swoje konto.</p>
        </div>
        <div className='flexboxContainer'>
            <div className='flexboxItem'>
                <form onSubmit={()=>{history.push('/zakup')}}>
                    <select value={value} onChange={(e)=>{
                        setValue(e.target.value)
                        console.log(e.target.value)
                    }}>
                        <option value='3'>3 miesiące</option>
                        <option value='6'>6 miesięcy</option>
                        <option value='9'>9 miesięcy</option>
                        <option value='12'>12 miesięcy</option>
                    </select><br></br>
                    Cena: {value*15}zł <br></br>
                    <input className='sumbitBtn2' type='submit' value="Zakup"></input>
                </form>
            </div> 
            
        </div>
    </div> );
}
 
export default Subskrypcja;