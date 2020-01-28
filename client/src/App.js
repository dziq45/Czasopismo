import React, {useState, useEffect} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Prenumerata from './components/Prenumerata'
import Egzemplarze from './components/Egzemplarze'
import Zakup from './components/Zakup'
import banner from './images/banner.png'
import Subskrypcja from './components/Subskrypcja'
import Sukces from './components/Sukces'
import Porazka from './components/Porazka'
const App=()=>{
  const [loggedIn, setLoggedIn] = useState(false)
  const [login, setLogin] = useState('')
  const [rolledUp, setRolledUp] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('login')){
      setLogin(localStorage.getItem('login'))
      setLoggedIn(true)
    }
  },[])
  return(
    <div className='layout'>
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <div><img src={banner}></img></div>
        <Route path='/login' component={()=><Login toPath='/prenumerata' loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Login>}></Route>
        <Route path='/register' component={()=><Register toPath='/prenumerata' loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Register>}></Route>
        <Route path='/prenumerata' component={Prenumerata}></Route>
        <Route path='/subskrypcja' component={Subskrypcja}></Route>
        <Route path='/sukces' component={Sukces}></Route>
        <Route path='/porazka' component={Porazka}></Route>
        <Route path='/egzemplarze' component={()=><Egzemplarze ></Egzemplarze> }></Route>
        <Route path='/zakup' component={()=><Zakup loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Zakup>}></Route>
      </Router>
    </div>
  )
}


export default App;
