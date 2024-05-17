import React, {useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';


function EditarProducto() {
  // código para redireccionar
  const navigate = useNavigate(); 

  function handleButtonClick() {
      navigate('/productos');
  }

  // Obtener el ID de params
  const { idProducto } = useParams();

  // producto = state y funcion para actualiza
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });
  //archivo = state, guardarArchivo = setState
  const[archivo, guardarArchivo] = useState('');

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

  
  // cuando el componente carga
  useEffect(() => {
    // consultar API para traer producto a editar
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${idProducto}`);
      guardarProducto(productoConsulta.data);
    }

    consultarAPI();
  })

  //Edita producto en BD
  const editarProducto = async e => {
    e.preventDefault();

    // Crear un formData
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // almacenarlo en la BD
    try {
      const res = await clienteAxios.put(`/productos/${idProducto}`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });

      // Alerta
      if(res.status === 200){
        Swal.fire({
          title: 'Modificado Correctamente',
          text: res.data.mensaje,
          icon: 'success'
        })
      }

      console.log(res);

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

  // Extraer los valores de state
  const { nombre, precio, imagen } = producto;

  if(!nombre) return <Spinner />;

  return(
    <Fragment>
        <h2>Editar Producto</h2>

          <form
            onSubmit={editarProducto}
          >
              <legend>Llena todos los campos</legend>

              <div className="campo">
                  <label>Nombre:</label>
                  <input 
                    type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInfoProducto}
                    defaultValue= {nombre}
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
                    defaultValue= {precio}
                    />
              </div>

              <div className="campo">
                  <label>Imagen:</label>
                  { imagen ? (
                    <img src={`http://localhost:5000/${imagen}`}  alt="imagen" width="300"/>
                  ) : null }
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
                      value="Modificar Producto"
                      />
              </div>
          </form>
      </Fragment>  

  );
}


export default EditarProducto;