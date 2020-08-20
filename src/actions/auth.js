import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from "../types/types"
import { startLoading, finishLoading } from './ui'
import { noteLogout } from './notes'


//ACCION ASYNCRONA
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));

                dispatch(finishLoading());

            }).catch(e => {
                console.log(e);
                dispatch(finishLoading());

                if(e.code === 'auth/user-not-found'){
                    Swal.fire(
                        'Error',
                        'Correo incorrecto o usuario no registrado',
                        'error'
                    )
                } else if (e.code === 'auth/wrong-password'){
                    Swal.fire(
                        'Ups!!',
                        'La contraseña no es válida o el usuario no tiene contraseña',
                        'error'
                    )
                }
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name })

                console.log(user);

                dispatch(
                    login(user.uid, user.displayName)
                )

            }).catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        //Regresa una promesa
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(e => {
                console.log(e);
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};


export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch(logout());

        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout 
})