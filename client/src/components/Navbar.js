import React from 'react'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import '../css/Navbar.css'
const Navbar = (props) => {
    let history = useHistory()
    const logout=()=>{
        localStorage.removeItem('login')
        props.setLoggedIn(false)
        history.push('/prenumerata')
    }
    return (<div className='menuContainer'>
            <ul className='menuUL'>
                <li>
                   <a>Strona główna</a> 
                </li>
                <li>
                   <a>O czasopiśmie</a> 
                </li>
                <li>
                    <Link to='/prenumerata'>Prenumerata</Link>
                </li>
                {props.loggedIn? 
                    null : 
                <>
                    <li>
                        <Link to='/register'>Rejestracja</Link>
                    </li>
                    <li>
                        <Link to='/login'>Zaloguj się</Link>
                    </li>
                </>}
            </ul>
            <ul className='menuUL2'>
                {props.loggedIn? 
                    <>
                        <li>
                            <p>Witaj {localStorage.getItem('login')}!</p>
                        </li>
                        <li>
                            <a onClick={logout}>Wyloguj</a>
                        </li>
                    </> : null}
            </ul>
    </div>
            );
}
 
export default Navbar;