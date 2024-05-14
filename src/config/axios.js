import axios from 'axios';

// create para instanciarlo (axios)
const clienteAxios = axios.create({
    baseURL : 'http://localhost:5000'
});


export default clienteAxios;