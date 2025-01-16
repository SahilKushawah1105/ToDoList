import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status';

const JWT_SECRET = process.env.JWT_SECRET || ''; // Ensure your JWT secret is defined

export interface DecodedData {
    id: string;
    name: string;
    email: string;
}

export const generateToken = (Data : any) => {
    return jwt.sign(Data, JWT_SECRET, { expiresIn: '30d' });
}

// Middleware to check customer token validity
export const authentication = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: false,
                    data: {},
                    message: "Please Enter Token",
                    status: HTTP_STATUS.NOT_FOUND,
                });
            }

            let token = authHeader;
            if (token.startsWith("Bearer ")) {
                token = token.slice(7);
            }

            const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedData;

            req.user = decoded;

            next();
        } catch (error) {
            console.log("<<<<<Token Invalid Error<<<<<", error);
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, data: [], message: "Token is not valid" });
        }
    };
};