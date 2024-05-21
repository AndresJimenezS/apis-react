import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

import Swal from 'sweetalert2';


function NuevoPedido(props){
    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/pedidos');
    }

    // Obtener el ID de params
    const { id } = useParams();

    // STATE
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar funcion
        consultarAPI();

        // actualizar el total a pagar
        actualizarTotal();
    }, [productos])

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

    // Actualizar el total a pagar
    const actualizarTotal = () => {
        // si el arreglo de productos es igual a 0. el total es 0
        if(productos.length === 0){
            guardarTotal(0);
            return;
        }

        // calcular nuevo total
        let nuevoTotal = 0;
        //recorrer productos
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        // almacenar el total
        guardarTotal(nuevoTotal);
    }

    // Elimina un producto del state
    const eliminarProductoPedido = id => {
        // quita del arreglo el producto igual y retorna/mantiene los demás(por eso busca los diferentes)
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }

    // Almacena el pedido en BD
    const realizarPedido = async e => {
        e.preventDefault();

        //Construir pedido 
        const pedido ={
            "cliente" : id,
            "pedido" : productos,
            "total" : total
        }

        // almacenarlo en base de datos
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        // leer resultado
        if(resultado.status === 200){
            // alerta de éxito
            Swal.fire({
                type: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje,
                icon: 'success'
            });
        }else{
            //alerta de error
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo',
                icon: 'error'
            });
        }

        // Redireccionar
        handleButtonClick();
        
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
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}
                </ul>

                <p className='total'>Total a Pagar: <span>${total}</span></p>

                {
                    total > 0 ? (
                        <form 
                            onSubmit={realizarPedido}
                        >
                            <input  type="submit"
                                    className='btn btn-verde btn-block'
                                    value="Realizar Pedido"
                            />
                        </form>
                    ) : null}
        </Fragment>
    )
}


export default NuevoPedido;