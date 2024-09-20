import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { Router } from "./routes/userRoutes";
import chalk from "chalk";
import cors from "cors";

// Função de conectar-se ao banco de dados
import { DBconnection } from "./database/config";

// Inicializando o Express
const app = express();

// JSON PARSE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use(cors());

// CONFIGURANDO A ROTA DE USUÁRIOS
app.use("/user", Router);

app.get("/", (req, res) => {
  return res.status(200).send("Olá, mundo! 😊");
});

try {
  app.listen(process.env.PORT, async () => {
    await DBconnection();
    console.log(chalk.green.bold("O servidor foi inicializado!"));
  });
} catch (error) {
  process.exit(1);
}
