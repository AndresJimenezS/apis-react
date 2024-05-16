import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../layout/Spinner';

// cliente AXIOS
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

import { Link } from 'react-router-dom';

function Clientes() {

    // Trabajar con el state (clientes = state) (guardarClientes = funcion para guardar el state)
    const [clientes, guardarClientes] = useState([]); //[] es el valor inicial

    // Query a la API
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');
        guardarClientes(clientesConsulta.data);
    }

    // useEffect es similar a componentdidmount y willmount
    useEffect( () => {
        consultarAPI();
    }, [] );


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