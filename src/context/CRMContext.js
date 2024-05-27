import React, { createContext, useState, useEffect } from "react";

// como valor inicial recibe un objeto vacío y también una función
const CRMContext = createContext([ {}, () => {}]);

// Provider es de donde fluyen los datos
const CRMProvider = props => {

  // definir el state inicial
    let initialState = {
      token: '',
      auth: false
  };

  // comprobar si ya hay un token de sesion
  if (localStorage.getItem('token')) {
    initialState = {
      token: localStorage.getItem('token'),
      auth: true
    }
  }
  // definir el state inicial{acorde a lo definido arriba, un objto y función}
  const [auth, guardarAuth] = useState(initialState);

  useEffect(() => {
    // Actualizar el estado si el token cambia en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
        guardarAuth({
            token: token,
            auth: true
        });
    }
  }, []);

  return(
    <CRMContext.Provider value= {[auth, guardarAuth]} >
        {props.children}
        { /* de esta forma se pasa a todos los componentes*/}
    </CRMContext.Provider>
  )

}


export { CRMContext, CRMProvider };