import Swal from 'sweetalert2';
import { noteLogout } from "./notes";
import { types } from "../types/types";
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const startLoginEmailPassword= (email, password)=> {
    return (dispatch)=> {

        dispatch( startLoading() );
        
        const auth= getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user})=> {        

        //console.log(user);

        dispatch(
            login( user.uid, user.displayName )
        )

        dispatch( finishLoading() );

    }).catch( e=> {
        console.log(e);
        //Swal.fire('Error', e.message, 'error')
        if ( e.message === 'Firebase: Error (auth/user-not-found).' ){
            Swal.fire('Error', 'Wrong email or user should be deleted', 'error')
        }else if ( e.message === 'Firebase: Error (auth/wrong-password).'){
            Swal.fire('Error', 'Wrong password', 'error')
        }
    } )

    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
 
        const auth= getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then( async({user})=> {
 
                await updateProfile( user, { displayName: name });
 
            console.log(user);

            dispatch(
                login( user.uid, user.displayName )
            )
        }).catch( e=> {
            console.log(e)
            if ( e.message === 'Firebase: Error (auth/email-already-in-use).' ){
                Swal.fire('Error', 'Email address is already in use', 'error')
        }} )
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider).then(({user}) =>{
                //console.log(user)
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login= (uid, displayName)=> {
    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout= ()=> {
    return async( dispatch )=> {
        const auth= getAuth();
        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}


export const logout= ()=> ({
    type: types.logout
})

