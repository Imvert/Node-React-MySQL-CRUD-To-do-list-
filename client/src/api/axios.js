import axios from "axios";

//configuracion especial para establecer la cookie en el frontend
const instance = axios.create({
  baseURL: "https://appnotes-17jx.onrender.com/api",
  withCredentials: true, //permite enviar las cookies al frontend
});
export default instance;
