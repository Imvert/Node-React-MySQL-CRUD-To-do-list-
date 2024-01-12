import { config } from "dotenv";

config();

export const Secret_key = process.env.Secret_key;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

//config para postgress
export const HOST_NAME = process.env.PGHOST;
export const DATABASE_NAME = process.env.PGDATABASE;
export const USERNAME = process.env.PGUSER;
export const PASSWORD_DB = process.env.PGPASSWORD;

export const CONECTION_STRING = process.env.CONECTION_STRING;
