import axios from "axios";

const baseUrl = "http://localhost:4001/api/loginUser";

export const login = async (credentials) =>
  await axios.post(baseUrl, credentials);
