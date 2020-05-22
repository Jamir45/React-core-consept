import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth()
    // console.log(auth.user)
    const HandleSingIn = () => {
        auth.signInHandler()
        .then( result => {
            window.location.pathname = '/review'
        })
    }
    const HandleSingOut = () => {
        auth.signOutHandler()
        .then( result => {
            window.location.pathname = '/'
        })
    }
    return (
        <div className="container text-center">
            <h1>Log In is coming soon </h1>
            {
                auth.user ? <button onClick={HandleSingOut} className='btn btn-success'>Sign Out</button> :
                <button onClick={HandleSingIn} className='btn btn-success'>Sign In with google</button>
            }
        </div>
    );
};

export default Login;