import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

import Swal from 'sweetalert2';


function NuevoPedido(){
    // Obtener el ID de params
    const { id } = useParams();

    // STATE
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    
    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar funcion
        consultarAPI();
    })

    const buscarProducto = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        // validar resultados
        if(resultadoBusqueda.data[0]){
            // almacenar resultados en el state
            let productoResultado = resultadoBusqueda.data[0];
            // agregar llave producto (copia del id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;
            // ponerlo en el state
            guardarProductos([...productos, productoResultado]);

        }else{
            // si no hay resultados  una alerta
            Swal.fire({
                type: 'error',
                icon: "warning",
                title: 'Producto no encontrado',
                text: 'No hay resultados'
            })
        }
    }

    // almacenar busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
    }


    // actualizar la cantidad de productos
    const restarProductos = i => {
        // copiar el arreglo original de productos
        const todosProductos = [...productos];

        // validar si esta en 0 no puede ir más allá
        if(todosProductos[i].cantidad === 0) return;

        // restar
        todosProductos[i].cantidad--;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    };
    const aumentarProductos = i => {
        // copiar el arreglo original de productos
        const todosProductos = [...productos];

        // incremento
        todosProductos[i].cantidad++;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    }


    return(
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>

                <FormBuscarProducto 
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul className="resumen">
                    {productos.map((producto, index) => (
                        <FormCantidadProducto 
                            key={producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            aumentarProductos={aumentarProductos}
                            index={index}
                        />
                    ))}
                </ul>

                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
        </Fragment>
    )
}


export default NuevoPedido;