import React, {useContext} from 'react';

import { CRMContext } from '../../context/CRMContext';

import { Link, useNavigate } from 'react-router-dom';


const Header = () => {

    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/iniciar-sesion');
    }

    const [ auth, guardarAuth ] = useContext(CRMContext);

    const cerrarSesion = () => {
        //auth.auth= false y el token
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // Redireccionar
        handleButtonClick();
    };

    console.log('Auth in Header:', auth);


    return(
        // esta sintaxis representa un return
        <header className="barra"> 
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>

                    {auth.auth ? (
                        <button 
                            type="button"
                            className="btn btn-rojo"
                            onClick={cerrarSesion}
                        >
                            <i className="far fa-times-circle"></i>
                            Cerrar Sesión
                        </button>
                    ) : null}
                   
                </div>
            </div>
        </header>
    )

}

export default Header;