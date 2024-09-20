import mongoose from "mongoose";
import chalk from "chalk";

const uri = process.env.DATABASE_URL;

export async function DBconnection(): Promise<void> {
  try {
    await mongoose.connect(`${uri}`);
    console.info(chalk.yellow.bold("Conexão com o MongoDB inicializada!"));
  } catch (error) {
    throw new Error("Erro ao conectar-se com o MongoDB " + error);
  }
}
