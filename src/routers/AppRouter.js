import React from 'react';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { useState } from 'react';
import { PrivateRoute } from './PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
       
        const auth= getAuth();
        onAuthStateChanged(auth, (user)=>{
            //console.log(user);
            if ( user?.uid ){
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn (true);

                dispatch( startLoadingNotes(user.uid) )

            }else{
                setIsLoggedIn (false);
            }

            setChecking(false);

        });
       
    }, [dispatch, setChecking, setIsLoggedIn]);

    if ( checking ){
        return(
            <h1>Please wait...</h1>
        )
    }


    return (
        
        <Router>
            <div>
                <Switch>
                
                    <PublicRoute 
                        isAuthenticated= {isLoggedIn}
                        path="/auth" 
                        component= {AuthRouter} 
                    />
                    
                    <PrivateRoute 
                        isAuthenticated ={isLoggedIn}
                        exact
                        path="/" 
                        component= {JournalScreen} 
                    />

                    <Redirect to= "/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
