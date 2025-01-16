import express from "express";
import { validationMiddleware } from "../middleware/validation";
import { registerValidation, loginValidation } from "../constant/validationConstant";
import {
    registration,
    login
} from "../controller/user.controller"

const router = express.Router();

// Route for user registration
router.post("/User",validationMiddleware(registerValidation), registration);

// Route for user login
router.post("/login", validationMiddleware(loginValidation), login);

export default router;
