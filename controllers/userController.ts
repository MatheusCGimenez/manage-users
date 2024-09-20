import { Request, Response } from "express";
import { User } from "../schemas/UserSchema";
import { validationResult } from "express-validator";
import chalk from "chalk";
import { IUser } from "../interfaces/User";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { name, email } = req.body as { name: string; email: string };

  if (!name || !email)
    return res
      .status(500)
      .json({ success: false, error: "Houve um erro ao criar usuário!" });

  //   Checando se o usuário já existe no sistema e criando o cadastro em caso negativo
  // HELP OI

  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        error: "Este usuário já está cadastrado no sistema!",
      });
    }

    const newUser: IUser = { name, email };
    const user = await User.create(newUser);
    res
      .status(201)
      .json({ success: true, message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Checando se o ID é válido com a estrutura do MongoDB

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, error: "ID inválido!" });
  }

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário inexistente!" });
    }

    // Excluindo usuário

    await user.deleteOne();
    await User.findById(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Usuário deletado!" });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

const updateUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { id } = req.params as { id: string };
  const { name, email } = req.body as { name: string; email: string };

  // Checando se o ID é válido com a estrutura do MongoDB

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, error: "ID inválido!" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário inexistente!" });
    }
    if (name === user.name || email === user.email) {
      return res.status(400).json({
        success: false,
        error: "Não é possível atualizar as informações!",
      });
    }
    await user.updateOne({ name: name, email: email });
    return res
      .status(201)
      .json({ success: true, message: "Os dados foram atualizados!" });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

const findUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Checando se o ID é válido com a estrutura do MongoDB

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, error: "ID inválido!" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return;
    const name = user.name;
    const email = user.email;
    return res.status(200).json({
      success: true,
      message: "Usuário encontrado!",
      user: { name, email },
    });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Não há usuários!" });
    }
    res
      .status(200)
      .json({ success: true, message: `${users.length} encontrados!`, users });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
};

export const services = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  findUser,
};
