import express from "express";
import { validationMiddleware } from "../middleware/validation";
import { 
    todoValidation
} from "../constant/validationConstant";
import {
    createTodo,
    getAllTodos,
    getUserTodo,
    getTodoById,
    updateTodo,
    deleteTodo
} from "../controller/todo.controller";
import {authentication} from "../middleware/tokenCheck";

const router = express.Router();

//Route for create todo
router.post('/createTodo',authentication(), validationMiddleware(todoValidation), createTodo)

//Route for get all todos
router.get('/getAllTodos',authentication(), getAllTodos)

//Route for get user todo
router.get('/getUserTodo', authentication(), getUserTodo)

//Route for get todo by id
router.get('/getTodoById/:id', authentication(), getTodoById)

//Route for update todo
router.put('/updateTodo/:id', authentication(), validationMiddleware(todoValidation), updateTodo)

//Route for delete todo
router.delete('/deleteTodo/:id', authentication(), deleteTodo)

export default router;