import { createPool } from "mysql2/promise";
import { HOST, PORT, USER, PASSWORD, DATABASE } from "../config.js";

export const pool = createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  // ssl: {
  //   rejectUnauthorized: false,
    
  // }
});
