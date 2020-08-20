import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect, } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config'

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { startLoadingNotes } from '../actions/notes';






export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //ESTE EFECTO EVALUA QUE EL USUARIO ESTE EN FIREBASE Y AL RECARGAR EL NAVEGADOR CARGE LOS DATOS
    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);

        })

    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        //TODO: Cambiar diseño por uno mas bonito
        return (
            <h1>Espere...</h1>
        )
    }



    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoutes
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />

                    <PrivateRoutes
                        exact
                        path="/"
                        isAuthenticated={isLoggedIn}
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
