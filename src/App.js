import React, {Fragment} from 'react';

// Routing
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

/* Layout */
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'

/* Componentes */
import Clientes from './componentes/clientes/Clientes'
import Pedidos from './componentes/pedidos/Pedidos'
import NuevoCliente from './componentes/clientes/NuevoCliente'
import EditarCliente from './componentes/clientes/EditarCliente'

import Productos from './componentes/productos/Productos'
import EditarProducto from './componentes/productos/EditarProducto'
import NuevoProducto from './componentes/productos/NuevoProducto'




function App(){
  return(
    <BrowserRouter>  {/* envolver todo el código para utilizar routing*/}

    <Fragment> {/* sintaxis para utilizar varios componentes con fragment*/}
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
              <Route path="/productos/editar/:id" element={<EditarProducto />} />

              <Route path="/pedidos" element={<Pedidos />} />

            </Routes>
          </main>
        </div>

    </Fragment>
    </BrowserRouter>

  )
}

export default App;
