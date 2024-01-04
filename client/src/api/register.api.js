import axios from "../api/axios";
//En userData se envia todos los datos para el registro
export const register = async (userData) =>
  await axios.post("/saveUser", userData);
