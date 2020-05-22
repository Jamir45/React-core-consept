import React from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config'
import { useState } from "react";
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return  <AuthContext.Provider value={auth}>
            {props.children}
            </AuthContext.Provider>
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const userInfo = (user) => {
    const {displayName, email, photoURL, uid} = user;
    return {name: displayName, email: email, photo: photoURL, userId: uid};
}

const Auth = () => {
    const [user, setUser] = useState(null);
    
    const signInHandler = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            const signedInUser = userInfo(result.user)
            setUser(signedInUser);
            return result.user;
        })
        .catch( (error) => {
            setUser(null)
            return error.massage;
        })
    }
    

    const signOutHandler = () => {
        return firebase.auth().signOut()
        .then( result => {
            setUser(null)
        })
        .catch( error => {
            console.log(error.massage)
        })
    }

    useEffect( () => {
        firebase.auth().onAuthStateChanged( user => {
            if (user){
                const currentUser = userInfo(user);
                setUser(currentUser)
            }
        })
    }, [])


    return {
        user,
        signInHandler,
        signOutHandler,
    };
}

export default Auth;