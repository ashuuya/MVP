import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @return {Promise<mysql.Connection>}
 */
export const stablishedConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

export const closeDbConnection = (connection) => {
  connection.destroy();
};
