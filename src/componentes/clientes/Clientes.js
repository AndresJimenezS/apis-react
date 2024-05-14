import React, { useEffect, useState, Fragment } from 'react';

// cliente AXIOS
import clienteAxios from '../../config/axios';


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


    return(
        <Fragment>
            <h1>Clientes</h1>  
            <ul className='listado-clientes'>
                {clientes.map(cliente => {
                    console.log(cliente);
                })}
            </ul>
        </Fragment>
    );
}


export default Clientes;