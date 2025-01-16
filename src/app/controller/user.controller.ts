import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/tokenCheck";
import User, { IUser } from "../model/user.model";
import { commonSuccess, commonError, commonNotFound } from "../constant/commonResponse";
import HTTP_STATUS from 'http-status';
import { AUTH_MESSAGE } from "../constant/messages";

const saltRound = 10;

export const registration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const findUser = await User.findOne({ email, is_deleted: false });

        if (findUser) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, AUTH_MESSAGE.emailExist));
            return;
        }

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, saltRound);

        const data: Partial<IUser> = {
            name,
            email,
            password: encryptedPassword
        };

        await User.create(data);

        res.status(HTTP_STATUS.OK).json(commonSuccess({}, AUTH_MESSAGE.registerSuccess));
    } catch (error) {
        console.error("-------------Registration Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const findUser = await User.findOne({ email, is_deleted: false });

        if (!findUser) {
            res.status(HTTP_STATUS.NOT_FOUND).json(commonNotFound({}, AUTH_MESSAGE.notFound));
            return;
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (isPasswordValid) {
            const tokenPayload = {
                email,
                id: findUser._id,
            };

            const createToken = await generateToken(tokenPayload);

            res.status(HTTP_STATUS.OK).json(commonSuccess(createToken, AUTH_MESSAGE.loginSuccess));
        } else {
            res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json(commonError({}, AUTH_MESSAGE.wrongPassword));
        }
    } catch (error) {
        console.error("-------------Login Error -------------", error);
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonError({}, error.messages));
    }
};
