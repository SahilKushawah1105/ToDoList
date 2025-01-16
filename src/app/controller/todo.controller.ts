import { Request, Response } from "express";
import ToDO, { ITodo } from "../model/ToDo.model";
import { commonSuccess, commonError, commonNotFound } from "../constant/commonResponse";
import HTTP_STATUS from 'http-status';
import { TODO_MESSAGE } from "../constant/messages";

export const createTodo = async (req: Request, res: Response) => {
    try {
        const {title, description, dueDate} = req.body;

        const todoData = {
            title,
            description,
            dueDate,
            user_id: req.user.id
        }

        const newTodo = await ToDO.create(todoData)

        res.status(HTTP_STATUS.CREATED).json(commonSuccess(newTodo, TODO_MESSAGE.todoSuccess));
    } catch (error) {
        console.error("-------------create todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const getTodos = await ToDO.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    dueDate: 1,
                    completed: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ])

        if(getTodos.length > 0){
            res.status(HTTP_STATUS.OK).json(commonSuccess(getTodos, TODO_MESSAGE.getTodosSuccess));
        }
    } catch (error) {
        console.error("-------------get all todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}

export const getUserTodo = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;

        const getUserTodo = await ToDO.find({user_id: id});

        if(getUserTodo.length > 0){
            res.status(HTTP_STATUS.OK).json(commonSuccess(getUserTodo, TODO_MESSAGE.getTodosSuccess));
        }
    } catch (error) {
        console.error("-------------get todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const getTodo = await ToDO.findById(id);

        if(!getTodo) res.status(HTTP_STATUS.NOT_FOUND).json(commonNotFound({}, TODO_MESSAGE.todoNotFound));

        res.status(HTTP_STATUS.OK).json(commonSuccess(getTodo, TODO_MESSAGE.getTodoSuccess));
    } catch (error) {
        console.error("-------------get todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const {title, description, dueDate} = req.body;

        const {id} = req.params;

        const updatedTodo = await ToDO.findByIdAndUpdate({_id: id}, {title, description, dueDate}, {new: true});

        if(!updatedTodo) res.status(HTTP_STATUS.NOT_FOUND).json(commonNotFound({}, TODO_MESSAGE.todoNotFound));

        res.status(HTTP_STATUS.OK).json(commonSuccess(updatedTodo, TODO_MESSAGE.todoUpdated));
    } catch (error) {
        console.error("-------------update todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const deletedTodo = await ToDO.findByIdAndDelete(id);

        if(!deletedTodo) res.status(HTTP_STATUS.NOT_FOUND).json(commonNotFound({}, TODO_MESSAGE.todoNotFound));

        res.status(HTTP_STATUS.OK).json(commonSuccess({}, TODO_MESSAGE.todoDeleted));
    } catch (error) {
        console.error("-------------delete todo Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
}