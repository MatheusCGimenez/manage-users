import express, { Request, Response, NextFunction } from "express";
export const Router = express.Router();

// CONTROLLERS
import { services } from "../controllers/userController";

// VALIDATIONS
import { createUserValidation } from "../validations/userValidations";

Router.post("/create", createUserValidation(), services.createUser);
Router.put("/update/:id", createUserValidation(), services.updateUser);
Router.get("/find/:id", services.findUser);
Router.delete("/delete/:id", services.deleteUser);
Router.get("/all", services.getAllUsers);
