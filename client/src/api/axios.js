import axios from "axios";

//configuracion especial para establecer la cookie en el frontend
const instance = axios.create({
  baseURL: "http://localhost:4001/api",
  withCredentials: true, //permite enviar las cookies al frontend
});
export default instance;
