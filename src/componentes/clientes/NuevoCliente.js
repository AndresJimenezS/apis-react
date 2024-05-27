import React, {Fragment, useState, useContext} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';


// history es el que permite redireccionar
function NuevoCliente({history}){
    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/');
    }
    function handleButtonClickI() {
        navigate('/iniciar-sesion');
    }

    // utilizar valores del context
    const [ auth, guardarAuth ] = useContext(CRMContext);

    /* almacenar cliente en el state.
    cliente = state, guardarCliente= funcion para guardar el state*/
    const[cliente, guardarCliente] = useState ({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // Copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring del state
        const { nombre, apellido, email, empresa, telefono } = cliente;
        
        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido;
    }

    // Añade en la REST API un nuevo cliente
    const agregarCliente = e => {
        e.preventDefault();

        // enviar petición AXIOS; retorna Promesa
        clienteAxios.post('/clientes', cliente).then(res => {
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
                console.log(res.data);

                Swal.fire({
                    title: 'Se agregó el Cliente',
                    text: res.data.mensaje,
                    icon: 'success'
                });
            }

            // Redireccionar
            handleButtonClick();
        });
    }

    // Verificar si el usuario está autenticado o no
    if(!auth.auth && (localStorage.getItem('token') === auth.token )) {
        // Redireccionar
        handleButtonClickI();
    }

    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>
            
            <form onSubmit={ agregarCliente } >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text"
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente"
                            name="empresa"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente"
                            name="email"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number"
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input  type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Cliente"
                            disabled={ validarCliente() }
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default NuevoCliente;