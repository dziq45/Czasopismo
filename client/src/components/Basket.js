import React,{useState, useEffect} from 'react';
import basket from '../images/basket.png'
import '../css/Basket.css'
import cross from '../images/crossDelete.png'
import kolo from '../images/kolo.png'
import {Link} from 'react-router-dom'


const BasketBar = (props) => {
    const [rolledDown, setRolledDown] = useState(false)
    const [goToAuthentication, setAuthentication] = useState(false)
    
    const howMany =()=>{
        let sum = 0
        props.egzemplarzeDruk.forEach(element => {
            sum +=element.howMany
        });
        props.egzemplarzePdf.forEach(element=>{
            sum+=element.howMany
        })
        return sum
    }
    const howMuch=()=>{
        let sum = 0
        props.egzemplarzeDruk.forEach(element => {
            sum +=element.howMany*element.cena
        });
        props.egzemplarzePdf.forEach(element=>{
            sum+=element.howMany*element.cena
        })
        return sum
    }
    const handlePurchase=()=>{
        setAuthentication(true)
    }
    const deleteItem=(index, wersja)=>{
        if(wersja =='druk'){
            let array = [...props.egzemplarzeDruk]
            array.splice(index,1)
            props.setEgzemplarzeDruk(array)
        }
        else{
            let array = [...props.egzemplarzePdf]
            array.splice(index,1)
            props.setEgzemplarzePdf(array)

        }
    }
    const expanededBasket=()=>(
    <div className='expandedBasketContainer'>
        <div className='expandedBasketLabel'>
            <p>Lp.</p>
            <p>Data wydania / Wersja</p>
            <p>Ilość</p>
            <p>Cena</p>
            <p>Usuń</p>
        </div>
        {props.egzemplarzeDruk.map((item,i,arr)=>
        <div className='basketItem' key={i}>
            <p>{i+1}</p>
            <p>{item.datawydania.substring(0,10)} / {item.wersja}</p>
            <div><p>{item.howMany}</p></div>
            <p>{item.howMany*item.cena}zł</p>
            <div><img className='iconCross' onClick={()=>deleteItem(i,'druk')} src={cross} width='30' height='30'></img></div>
        
        </div>)}
        {props.egzemplarzePdf.map((item,i,arr)=>
        <div className='basketItem' key={i}>
            <p>{i+props.egzemplarzeDruk.length+1}</p>
            <p>{item.datawydania.substring(0,10)} / {item.wersja}</p>
            <div><p>{item.howMany}</p></div>
            <p>{item.howMany*item.cena}zł</p>
            <div><img className='iconCross' onClick={()=>deleteItem(i,'pdf')} src={cross} width='30' height='30'></img></div>
        </div>)}
        <div className='razemPodsumowanie'>Razem do zapłaty: {howMuch()}zł</div>
        <Link to='/zakup'><div className='zakupLink'><p>Zakup</p></div></Link>
    </div>)


    return ( <div>
        <div className='baksketContainer'>
            <div className='iconBasketContainer' onClick={()=>{setRolledDown(!rolledDown) }}>
                <div className='howMany'><img className='kolo' src={kolo}></img></div>
                <div className='howMany2'><b>{howMany()}</b></div>
                <img className='basketImage' src={basket}></img>
            </div>
        </div>
        {rolledDown && howMany()>0? (expanededBasket()) : null}     
    </div> );
}
 
export default BasketBar;