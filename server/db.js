import { createPool, createConnection } from "mysql2/promise";
import pg from "pg";
import {
  HOST,
  PORT,
  USER,
  PASSWORD,
  DATABASE,
  CONECTION_STRING,
} from "../config.js";

//CONEXION PARA PRODUCCION EN PLANETSCALE
// export const conection = createConnection(DATABASE_URL, { rowsAsArray: true });

// Conexion mysql con createPool solo funciona en local
export const pool = createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

//conexion a postgress
export const pgPool = new pg.Pool({
  connectionString: CONECTION_STRING,
});
