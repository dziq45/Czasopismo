import React,{useState, useEffect} from 'react';
import axios from 'axios'
import '../css/Egzemplarze.css'
import Egzemplarz from './Egzemplarz'
import Basket from './Basket'

const Egzemplarze = (props) => {
    const[egzemplarze, setEgzemplarze] = useState([])
    const[egzemplarzeDruk, setEgzemplarzeDruk] = useState([])
    const[egzemplarzePdf, setEgzemplarzePdf] = useState([])
    const[isBuying, setBuying] = useState(false)

    useEffect(()=>{
        async function fetchdata (){
            const response = await axios.get('/Egzemplarze')
            setEgzemplarze(response.data)
            
        }
        fetchdata()
        setEgzemplarzePdf(JSON.parse(localStorage.getItem('egzemplarzePdf')))
        setEgzemplarzeDruk(JSON.parse(localStorage.getItem('egzemplarzeDruk')))
    },[])
    useEffect(()=>{
        localStorage.setItem('egzemplarzePdf', JSON.stringify(egzemplarzePdf))
        localStorage.setItem('egzemplarzeDruk', JSON.stringify(egzemplarzeDruk))
    }, [egzemplarzePdf, egzemplarzeDruk])

    const addItem=(item)=>{
        let flag = false
        if(item.wersja == 'druk'){
            let array = [...egzemplarzeDruk]
            array.forEach(element => {
                if(element.id == item.id){
                    element.howMany++
                    flag = true
                    setEgzemplarzeDruk(array)
                }
            });
            if(!flag){

                item.howMany=1
                setEgzemplarzeDruk([...egzemplarzeDruk, item])
            }
        }
        else if(item.wersja =='pdf'){
            let array = [...egzemplarzePdf]
            array.forEach(element => {
                if(element.id == item.id){
                    element.howMany++
                    flag = true
                    setEgzemplarzePdf(array)
                }
            });
            if(!flag){
                item.howMany=1
                setEgzemplarzePdf([...egzemplarzePdf, item])
            }
        }
        localStorage.setItem('egzemplarzePdf', egzemplarzePdf)
        localStorage.setItem('egzemplarzeDruk', egzemplarzeDruk)
        console.log(localStorage.getItem('egzemplarzeDruk'))
    }
    return(<>
        <Basket isBuying={isBuying} setBuying={setBuying} egzemplarzeDruk={egzemplarzeDruk} setEgzemplarzeDruk={setEgzemplarzeDruk} setEgzemplarzePdf={setEgzemplarzePdf} egzemplarzePdf={egzemplarzePdf}></Basket>
    <div className='underBasketContainer'>
        <div className='wyszukiwarka'>
            <p>Wyszukiwarka</p>
            <input className='szukaj' type='text' placeholder='Wprowadź interesujące cię słowa'></input>
            <input className='szukajBtn' type='submit' value='Szukaj'></input>
            <p>Filtrowanie</p>
            <input className='checkbox' type='checkBox'></input> PDF <br></br>
            <input className='checkbox' type='checkBox'></input> Drukowane
        </div>
        <div className='egzemplarzeContainer'>
            {egzemplarze.map((item,i,arr)=><Egzemplarz addItem={addItem} key={i} item={item}></Egzemplarz>)}
        </div>
    </div>
    
    </>)
}

export default Egzemplarze