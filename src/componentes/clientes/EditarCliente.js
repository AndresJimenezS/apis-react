import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


// Props es donde se encuentra inyectado el id de los params
function EditarCliente(){

    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/');
    }

    // Obtener el ID de params
    const { idCliente } = useParams();

    /* almacenar cliente en el state.
    cliente = state, guardarCliente= funcion para guardar el state*/
    const[cliente, datosCliente] = useState ({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${idCliente}`);
        
        // colocar datos en el state
        datosCliente(clienteConsulta.data);
    }

    // useEffect cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, []);

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            // Copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    // Envía petición AXIOS para actualizar cliente
    const actualizarCliente = e => {
        e.preventDefault();

        // enviar petición por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente).then(res => {
            // validar si retorna errores de Mongo
            if(res.data.code == 11000){
                console.log('Error de duplicado')
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'Ese correo ya está registrado',
                    icon: 'error'
                });
            }else{
                //console.log(res.data);

                Swal.fire({
                    title: 'Se modificó correctamente',
                    text: res.data.mensaje,
                    icon: 'success'
                });
            }

            // Redireccionar
            handleButtonClick();
        });
    }

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring del state
        const { nombre, apellido, email, empresa, telefono } = cliente;
        
        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido;
    }

    return(
        <Fragment>
            <h2>Editar Cliente</h2>
            
            <form  
                onSubmit = {actualizarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text"
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                            value={cliente.apellido}

                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente"
                            name="empresa"
                            onChange={actualizarState}
                            value={cliente.empresa}

                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente"
                            name="email"
                            onChange={actualizarState}
                            value={cliente.email}

                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number"
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                            value={cliente.telefono}

                    />
                </div>

                <div className="enviar">
                    <input  type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            disabled={ validarCliente() }
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default EditarCliente;