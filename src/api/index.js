import axios from 'axios';

// Crea una instancia
const instance = axios.create({
  baseURL: 'https://testsh.alphasoft.com.ve/api-test-notes', // Reemplaza con la URL específica que deseas usar
  timeout: 5000,
  headers: {
    //'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  }
});

export default instance;