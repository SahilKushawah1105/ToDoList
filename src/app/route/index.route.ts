import express from "express";
import userRoute from "./user.route";
import todoRoute from "./todo.route";

const router = express.Router();

router.use('/User', userRoute);
router.use('/todo', todoRoute);

export default router;
