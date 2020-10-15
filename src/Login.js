import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
function Login() {
    const [state,dispatch] = useStateValue()

    const signIn =()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })

        }).catch(error=>alert(error.message))
}
    return (
        <div className='login'>
            <div className="login__container">
                <div className="login__info">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" alt=""/>
            
                <Button onClick={signIn}>Sign in with google</Button>

                </div>
                <div className="login__bottom">
                <h4>from</h4>
                <h3>Suhas Kamble</h3>
            </div>
            </div>
           
        </div>
    )
}

export default Login
