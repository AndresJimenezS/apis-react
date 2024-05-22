import React, { useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

function Pedidos() {
  const [pedidos, guardarPedidos ] = useState([]);

  useEffect(() => {

    const consultarAPI = async () => {
      //obtener los pedidos
      const resultado = await clienteAxios.get('/pedidos');
      guardarPedidos(resultado.data);
    }

    consultarAPI();
  }, [pedidos])

  return(
    <Fragment>
      <h1>Pedidos</h1>  

      <ul className="listado-pedidos">
          {pedidos.map(pedido => (
            <DetallesPedido 
              key={pedido._id}
              pedido={pedido}
            />
          ))}
      </ul>
    </Fragment>

  );
}


export default Pedidos;