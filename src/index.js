import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
import { stablishedConnection, closeDbConnection } from "./db/dbConnection.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/clubs", async (req, res) => {
  try {
    const connection = await stablishedConnection();
    //TODO: написать запрос к БД через connection и вернуть пользователю через res.send
    const [rows] = await connection.query("SELECT * FROM clubs");
    res.json(rows);
  } catch (error) {
    console.log("Ошибка " + error);
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const connection = await stablishedConnection();
    const [rows] = await connection.query("SELECT * FROM students");
    res.json(rows);
  } catch (error) {
    console.log("Ошибка " + error);
  }
});

app.get("/api/managers", async (req, res) => {
  try {
    const connection = await stablishedConnection();
    const [rows] = await connection.query("SELECT * FROM managers");
    res.json(rows);
  } catch (error) {
    console.log("Ошибка " + error);
  }
});

app.get("/api/forms", async (req, res) => {
  try {
    const connection = await stablishedConnection();
    const [rows] = await connection.query("SELECT * FROM forms");
    res.json(rows);
  } catch (error) {
    console.log("Ошибка " + error);
  }
});

app.post("/api/studenttoclub", async (req, res) => {
  /**
   * @type {mysql.Connection | null}
   */
  let connection = null;

  try {
    /* TODO:  1) через req.body получить доступ к id
              2) валидация для id (то, что он сущ и он нужного типа)
              3) через id получить доступ к студенту с помощью запроса к бд
              4) записать нового студента с проверками какими-нибудь
              5) возврат через res.send ответ результата записи (ошибки, если он там есть)
              6) проверка на работу - http клиент 
    */
    const formClubId = req.body.clubId;
    const formStudentId = req.body.studentId;

    const connection = await stablishedConnection();
    const [rows] = await connection.query(
      `SELECT fio FROM students WHERE id = ${studentId}`
    );
    res.json(rows);
    console.log(rows);

    if (typeof formClubId !== "number")
      return res.send("formClubId must be number").status(400);
    if (typeof formStudentId !== "number")
      return res.send("formStudentId must be number").status(400);

    // TODO: сделать проверку на повторки
    const sql = `INSERT INTO forms (id_clubs, id_students, creation_date, update_date, clubname, studname) VALUES (?,?,?,?,?,?)`;
    const [data] = await connection.query(sql, [
      formClubId,
      formStudentId,
      new Date(Date.now()),
      new Date(Date.now()),
      clubname,
      studname,
    ]);
    closeDbConnection(connection);
    res.json({ status: "ok" }).status(200);
  } catch (error) {
    res.json({ status: "error" }).status(400);
    console.log("Ошибка " + error);
  } finally {
    if (connection) closeDbConnection(connection);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
