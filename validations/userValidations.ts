import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../schemas/UserSchema";
import chalk from "chalk";

export const createUserValidation = () => {
  return [
    body("name")
      .trim()
      .isString()
      .isLength({ min: 3, max: 15 })
      .withMessage("O nome precisa ter entre 3 e 15 caracteres!")
      .escape(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("É necessário inserir um E-mail válido!")
      .escape(),
  ];
};
