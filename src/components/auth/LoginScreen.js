import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth'

export const LoginScreen = () => {

    //Hook de redux para mandar los datos a las actions
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        // email: 'julian@gmail.com',
        // password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        //e EVITAR QUE EL FORMULARIO RECARGE EL NAVEGADOR CON EL SUBMIT
        e.preventDefault();

        // dispatch(login(12345, 'Julian'));
        dispatch(startLoginEmailPassword(email, password));
    }

    const handelGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit={handleLogin} 
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Entrar
                </button>

                <div className="auth__social-networks">
                    <p>Iniciar con una red social</p>
                    <div className="google-btn" onClick={handelGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Iniciar con google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Crear una cuenta
                </Link>
            </form>
        </>
    )
}
