import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';


function Productos() {

  // código para redireccionar
  const navigate = useNavigate(); 

  function handleButtonClick() {
      navigate('/iniciar-sesion');
  }

  // productos = state, guardarProductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  // utilizar valores del context
  const [ auth, guardarAuth ] = useContext(CRMContext);

  // useEffect para consultar API cuando cargue
  useEffect(() => {
    if(auth.token !== ''){
        const consultarAPI = async () => {
            try {
                const productosConsulta = await clienteAxios.get('/productos', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                guardarProductos(productosConsulta.data);
            } catch (error) {
                if(error.response.status === 500) {  
                    handleButtonClick();
                }
            }
        }
        consultarAPI();
    } else {
        handleButtonClick();
    }
  }, [productos]);  // Corregir la dependencia del useEffect

  if(!auth.auth){
    handleButtonClick();
  }
  // Spinner de carga
  if(!productos.length) return <Spinner />

  return(
    <Fragment>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> 
      <i className="fas fa-plus-circle"></i>
              Nuevo Producto
      </Link>

          <ul className="listado-productos">
              {productos.map(producto => (
                <Producto 
                  key= {producto._id}
                  producto={producto}
                />
              ))}
          </ul>
    </Fragment>
  );
}


export default Productos;