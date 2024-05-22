import React from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function DetallesPedido({pedido}){

    const{cliente} = pedido;

    // Eliminar cliente
    const eliminarPedido = idPedido => {
        Swal.fire({
            title: "¿Estás seguro que deseas eliminarlo?",
            text: "Si eliminas un pedido no podrás recuperarlo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${idPedido}`).then(res => {
                    Swal.fire({
                        title: "Eliminado Correctamente!",
                        text: res.data.mensaje,
                        icon: "success"
                        });
                })
               
            }
          });
    }

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: 0192019201291201</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        <li>
                            {pedido.pedido.map(articulos => (
                                <li key={pedido._id+articulos.producto._id}>
                                    <p>{articulos.producto.nombre}</p>
                                    <p>Precio: {articulos.producto.precio}</p>
                                    <p>Cantidad: {articulos.cantidad}</p>
                                </li>
                            ))}
                        </li>
                    </ul>
                </div>

                <p className="total">Total: ${pedido.total} </p>
            </div>

            <div className="acciones">
                <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarPedido(pedido._id)}
                        >
                    <i className="fas fa-times"></i> 
                Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido;
