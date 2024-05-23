import React, {useState} from "react"; 
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Login(){

    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/');
    }

    const [ credenciales, guardarCredenciales ] = useState({
        email: '',
        password: ''
    });

    // almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    };

    const iniciarSesion = async e => {
        e.preventDefault();

        // autenticar usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            // extraer el token y guardarlo en LocalStorage{es un lugar seguro para guardarlo}
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // alerta
            Swal.fire({
                title: 'Login Correcto',
                text: 'Has iniciado sesión correctamente',
                icon: 'success'
            });

            // Redireccionar
            handleButtonClick();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Hubo un error',
                text: error.response.data.mensaje,
                icon: 'error'
            });
        }
    }

    return(
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input  type="text"
                                name="email"
                                placeholder="Email para Iniciar Sesión"
                                onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input  type="password"
                                name="password"
                                placeholder="Password para Iniciar Sesión"
                                required
                                onChange={leerDatos}
                        />
                    </div>

                    <input  type="submit" 
                            value="Iniciar Sesión" 
                            className="btn btn-verde btn-block"
                    />
                </form>
            </div> 
        </div>
    )
}


export default Login;