import React, {useState, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';


function NuevoProducto() {
    // código para redireccionar
    const navigate = useNavigate(); 

    function handleButtonClick() {
        navigate('/productos');
    }

    // producto = state, guardarProducto = setState
    const [producto, guardarProducto] = useState({
      nombre: '',
      precio: ''
    });
    //archivo = state, guardarArchivo = setState
    const[archivo, guardarArchivo] = useState('');

    // almacena producto en base de datos
    const agregarProducto = async e => {
      e.preventDefault();

      // Crear un formData
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('precio', producto.precio);
      formData.append('imagen', archivo);

      // almacenarlo en la BD
      try {
        const res = await clienteAxios.post('/productos', formData, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        });

        // Alerta
        if(res.status === 200){
          Swal.fire({
            title: 'Agregado Correctamente',
            text: res.data.mensaje,
            icon: 'success'
          })
        }

        // Redireccionar
        handleButtonClick();

      } catch (error) {
        console.log(error);
        // lanzar alerta
        Swal.fire({
          type: 'error',
          title: 'Hubo un error',
          text: 'Vuelva a intentarlo'
        })
      }
    }

    // leer los datos del formulario
    const leerInfoProducto = e => {
      guardarProducto({
        //obtener copia del state
        ...producto,
        [e.target.name] : e.target.value
      })
    }

    // coloca imagen en el state
    const leerArchivo = e => {
      guardarArchivo(e.target.files[0]);
    }

    return(
      <Fragment>
        <h2>Nuevo Producto</h2>

          <form
            onSubmit={agregarProducto}
          >
              <legend>Llena todos los campos</legend>

              <div className="campo">
                  <label>Nombre:</label>
                  <input 
                    type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInfoProducto}
                    />
              </div>

              <div className="campo">
                  <label>Precio:</label>
                  <input 
                    type="number" 
                    name="precio" 
                    min="0.00" 
                    step="0.01" 
                    placeholder="Precio" 
                    onChange={leerInfoProducto}
                    />
              </div>

              <div className="campo">
                  <label>Imagen:</label>
                  <input 
                    type="file"  
                    name="imagen"
                    onChange={leerArchivo}
                    />
              </div>

              <div className="enviar">
                      <input 
                      type="submit" 
                      className="btn btn-azul" 
                      value="Agregar Producto"
                      
                      />
              </div>
          </form>
      </Fragment>  
    );
}


export default NuevoProducto;