import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
interface CustomRequest extends Request {
    user?: any;
}

export const guard = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = verify(token, jwtSecret);
        req.user = decoded;

        return next();
    } catch (error) {
        // return res.status(401).json({ message: "Unauthorized" });
        res.sendStatus(401);
    }
};

