import axios from "axios";
//En userData se envia todos los datos para el registro
export const register = async (userData) =>
  await axios.post("http://localhost:4001/api/saveUser", userData);
