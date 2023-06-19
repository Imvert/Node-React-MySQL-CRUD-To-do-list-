/*este import una instancia creada de un archivo de axios configurado para establecer la cookie cuando se loguea*/
import axios from "../api/axios";

const baseUrl = "/loginUser";

export const login = async (credentials) =>
  await axios.post(baseUrl, credentials);
