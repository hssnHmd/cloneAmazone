import React, { useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import './Login.css'
import {auth} from '../firebase'

function Login() {
    const history = useNavigate();
const [email, setemail] = useState('');
const [password, setpassword] = useState('');

const signin=(e)=>{
    e.preventDefault();
     auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            
            if(auth){
                history('/')
            }
        })
        .catch((err) =>{
            alert(err.message)
        })
}
const register = e =>{
    e.preventDefault();
    auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth)
            if(auth){
                history('/')
            }
        })
        .catch((err) =>{
            alert(err.message)
        })
}
    return (
        <div className="login">
           <Link to='/'>
            <HomeIcon fontSize="large" className="home_icon"/>
           </Link> 
           <div className="login_container">
               <h1>Sign in</h1>
               <form className="login_form">
                   <label htmlFor="email">Email</label>
                   <input type="email" value={email} onChange={e=> setemail(e.target.value)} />
                   <label htmlFor="password">Password</label>
                   <input type="password"  value={password} onChange={e=> setpassword(e.target.value)} />
                   <button  className="login_button" onClick={signin} >Sign in</button>
                   <Link to='/register' onClick={register} >Create your account </Link>
               </form>
               
           </div>
        </div>
    )
}

export default Login
