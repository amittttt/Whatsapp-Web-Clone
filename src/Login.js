import React from 'react'
import { auth, provider } from './Firebase';
import './Login.css';
import { useStateValue } from './StateProvider';
function Login() {

  const [{}, dispatch] = useStateValue();

  const signIn = () => {
     auth.signInWithPopup(provider).then(result => {
      // console.log(result.user);
      dispatch({
        type: "SET_USER",
        user: result.user
      })
     }).catch(error => alert(error))
  }

  return (
    <div className='login_wrapper'>
        <div className='login'>
            <img src='data:image/jpeg;base64,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' />
            <h2>Login Page</h2>
            <button onClick={signIn}>Login with Gmail</button>
        </div>
    </div>
  )
}

export default Login