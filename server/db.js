import { createPool, createConnection } from "mysql2/promise";
import pg from "pg";
import {
  HOST,
  PORT,
  USER,
  PASSWORD,
  DATABASE,
  CONECTION_STRING,
  DATABASE_URL,
} from "../config.js";

export const pool = createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  connectTimeout: 20000,

  ssl: {
    rejectUnauthorized: true,
  },
});

export const pgPool = new pg.Pool({
  connectionString: CONECTION_STRING,
});
