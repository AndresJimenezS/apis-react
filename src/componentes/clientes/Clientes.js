import React, { useEffect, useState, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';

// cliente AXIOS
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

import { Link, useNavigate } from 'react-router-dom';

import { CRMContext } from '../../context/CRMContext';



function Clientes() {

    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/iniciar-sesion');
    }

    // Trabajar con el state (clientes = state) (guardarClientes = funcion para guardar el state)
    const [clientes, guardarClientes] = useState([]); //[] es el valor inicial

    // utilizar valores del context
    const [ auth, guardarAuth ] = useContext(CRMContext);
    
   
    // useEffect es similar a componentdidmount y willmount
    useEffect( () => {

        if(auth.token !== ''){
            // Query a la API
            const consultarAPI = async () => {  
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
        
                    // colocar el resultado en el state
                    guardarClientes(clientesConsulta.data);
                } catch (error) {
                    // Error con autorizacion
                    if(error.response.status === 500){
                        // Redireccionar
                        handleButtonClick();
                    }
                }
            }
        
            consultarAPI();
        }else{
           // Redireccionar
           handleButtonClick();
        }

    }, [] );


    if(!auth.auth){
        handleButtonClick();
    }

    // Spinner de carga
    if(!clientes.length) return <Spinner />

    return(
        <Fragment>
            <h1>Clientes</h1>  

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                 <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente
                    key={cliente._id}
                        cliente={cliente} /* Props- para pasar registros a Cliente.js*/
                    />
                ))}
            </ul>
        </Fragment>
    );
}


export default Clientes;