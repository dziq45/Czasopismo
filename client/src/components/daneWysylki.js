import React,{useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import '../css/Register.css'

 const Wysylka = (props) => {
    const [imieText, setimieText] = useState('')
    const [nazwiskoText, setnazwiskoText] = useState('')
    const [telefonText, settelefonText] = useState('')
    const [adresText, setadresText] = useState('')
    const [kodPocztowyText, setkodPocztowyText] = useState('')
    const [miastoText, setmiastoText] = useState('')
    const [wojewodztwoText, setwojewodztwoText] = useState('')
    const [imieColor, setimieColor] = useState('null')
    const [nazwiskoColor, setnazwiskoColor] = useState('null')
    const [telefonColor, settelefonColor] = useState('null')
    const [adresColor, setadresColor] = useState('null')
    const [kodPocztowyColor, setkodPocztowyColor] = useState('null')
    const [miastoColor, setmiastoColor] = useState('')
    const [wojewodztwoColor, setwojewodztwoColor] = useState('null')

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const ll = imieText
        const response = await axios.post('/Wysylkaa',{
            imie:imieText,
            nazwisko:nazwiskoText,
            telefon:telefonText,
            adres:adresText,
            kodPocztowy:kodPocztowyText,
            miasto:miastoText,
            wojewodztwo:wojewodztwoText
        })

        console.log(response)
        if(response.data.isGut){
            localStorage.setItem('idWysylki', response.data.id)
            props.setWysylka(false)
        }
        else{
            let err = response.data.errors
            setimieColor(err[0]? 'null':'red')
            setnazwiskoColor(err[1]? 'null':'red')
            settelefonColor(err[2]? 'null':'red')
            setadresColor(err[3]? 'null':'red')
            setkodPocztowyColor(err[4]? 'null':'red')
            setmiastoColor(err[5]? 'null':'red')
        }
    }
     return ( 
         <div className='formContainer'>
             <div className='formName'>
                <p><b>Dane wysyłki</b></p>
            </div>
             <form noValidate onSubmit={handleSubmit}>
                <input style={{borderColor:imieColor}} type="text" onChange={(e)=>{setimieText(e.target.value)}} placeholder="Imię"></input><br></br>
                <input style={{borderColor:nazwiskoColor}} type="text" onChange={(e)=>{setnazwiskoText(e.target.value)}} placeholder="Nazwisko"></input><br></br>
                <input style={{borderColor:telefonColor}} type="text" onChange={(e)=>{settelefonText(e.target.value)}} placeholder="Telefon"></input><br></br>
                <input style={{borderColor:adresColor}} type="text" onChange={(e)=>{setadresText(e.target.value)}} placeholder="Adres"></input><br></br>
                <input style={{borderColor:kodPocztowyColor}} type="text" onChange={(e)=>{setkodPocztowyText(e.target.value)}} placeholder="Kod pocztowy"></input><br></br>
                <input style={{borderColor:miastoColor}} type="text" onChange={(e)=>{setmiastoText(e.target.value)}} placeholder="Miasto"></input><br></br>
                <input style={{borderColor:wojewodztwoColor}} type="text" onChange={(e)=>{setwojewodztwoText(e.target.value)}} placeholder="Województwo"></input><br></br>
                <input className='submitBtn' type="submit" value="Zapisz"></input><br></br>
             </form>
         </div>
      );
 }
  
 export default Wysylka;