import React, {Fragment} from 'react';

// Routing
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

/* Layout */
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'

/* Componentes */
import Clientes from './componentes/clientes/Clientes'
import Pedidos from './componentes/pedidos/Pedidos'
import Productos from './componentes/productos/Productos'


function App(){
  return(
    <BrowserRouter>  {/* envolver todo el código para utilizar routing*/}

    <Fragment> {/* sintaxis para utilizar varios componentes con fragment*/}
      <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main class="caja-contenido col-9">

            <Routes>
              <Route path="/" element={<Clientes />} />

              <Route path="/productos" element={<Productos />} />

              <Route path="/pedidos" element={<Pedidos />} />

            </Routes>
          </main>
        </div>

    </Fragment>
    </BrowserRouter>

  )
}

export default App;
