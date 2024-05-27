import React, {Fragment, useContext, useState} from 'react';

// Routing
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

/* Layout */
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'

/* Componentes */
import Clientes from './componentes/clientes/Clientes'
import NuevoCliente from './componentes/clientes/NuevoCliente'
import EditarCliente from './componentes/clientes/EditarCliente'

import Productos from './componentes/productos/Productos'
import EditarProducto from './componentes/productos/EditarProducto'
import NuevoProducto from './componentes/productos/NuevoProducto'

import Pedidos from './componentes/pedidos/Pedidos'
import NuevoPedido from './componentes/pedidos/NuevoPedido'

import Login from './componentes/auth/Login'

import { CRMContext, CRMProvider } from './context/CRMContext';



function App(){

  // utilizar context en el componente; accedo a los valores definidos en CRMContext.js
  const [ auth, guardarAuth ] = useContext(CRMContext);

  return(
    <CRMProvider> {/* Envolver toda la aplicación con CRMProvider */}
    <BrowserRouter>  {/* Envolver el código para utilizar routing */}
      <Fragment> {/* Utilizar varios componentes con fragment */}
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes />} />
              <Route path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route path="/clientes/editar/:idCliente" element={<EditarCliente />} />

              <Route path="/productos/nuevo" element={<NuevoProducto />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/editar/:idProducto" element={<EditarProducto />} />

              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/pedidos/nuevo/:id" element={<NuevoPedido />} />

              <Route path="/iniciar-sesion" element={<Login />} /> 
            </Routes>
          </main>
        </div>
      </Fragment>
    </BrowserRouter>
  </CRMProvider>
);
}

export default App;
