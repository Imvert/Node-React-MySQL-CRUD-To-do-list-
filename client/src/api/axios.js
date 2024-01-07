import axios from "axios";

//configuracion especial para establecer la cookie en el frontend
const URL = import.meta.env.BACKEND_URL;

const instance = axios.create({
  baseURL: `${URL}/api` || "http://localhost:4001/api",
  withCredentials: true, //permite enviar las cookies al frontend
});
export default instance;
