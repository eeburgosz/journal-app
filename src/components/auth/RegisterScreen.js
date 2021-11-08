import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    //const state = useSelector(state => state.ui);
    const {msgError} = useSelector(state => state.ui);
    //console.log(msgError);

    const [ formValues, handleInputChange ]= useForm({
        name: 'Ernesto',
        email: 'eburgos@gmail.com',
        password: '123456',
        password2: '123456' 
    });

    const dispatch = useDispatch();

    const { name, email, password, password2 }= formValues;

    const handleRegister= (e)=> {
        e.preventDefault();
        //console.log(name, email, password, password2); 
        if ( isFormValid() ){
            //console.log('Formulario correcto');
            dispatch( startRegisterWithEmailPasswordName(email, password, name) )
        }       
    }

    const isFormValid= ()=> {
        
        if( name.trim().length <= 1 ){
            //console.log('Name is required');
            dispatch( setError('Name is required') )
            return false;
        }else if ( !validator.isEmail( email ) ){
            //console.log('Email is not valid');
            dispatch( setError('Email is not valid') )
            return false;
        }else if ( password !== password2 || password.length < 6 ){
            //console.log('Password must have 6 characters at least and match both');
            dispatch( setError('Password must have 6 characters at least and match both') )
            return false;
        }
        dispatch( removeError() )
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form onSubmit= {handleRegister}>

                { 
                    msgError && 
                    (                        
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Full name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value= {name} 
                    onChange= {handleInputChange}/>
                
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value= {email} 
                    onChange= {handleInputChange}/>
                
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value= {password} 
                    onChange= {handleInputChange}/>
               
                <input
                    type="password"
                    placeholder="Repeat password"
                    name="password2"
                    className="auth__input"
                    value= {password2} 
                    onChange= {handleInputChange}/>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5">
                    Register
                </button>
                
                <Link 
                    to="login"
                    className="link ">
                        Already registered?
                </Link>

            </form>
        </div>
    )
}
