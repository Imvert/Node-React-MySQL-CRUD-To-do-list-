import axios from "axios";

//configuracion especial para establecer la cookie en el frontend
const URL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: `${URL}/api`,
  withCredentials: true, //permite enviar las cookies al frontend
});
export default instance;
