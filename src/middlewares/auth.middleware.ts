import { NextFunction, Request, Response } from "express";
import firebaseAdmin from "../config/firebase.config";

interface CustomRequest extends Request {
    user?: any;
}


export default async function (req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const firebaseToken = req.headers.authorization?.split(" ")[1];

        let firebaseUser;
        if (firebaseToken) {
            firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
        }

        if (!firebaseUser) {
            // Unauthorized
            return res.sendStatus(401);
        }

        const usersCollection = req.app.locals.db.collection("user");

        const user = await usersCollection.findOne({
            firebaseId: firebaseUser.user_id
        });

        if (!user) {
            // Unauthorized
            return res.sendStatus(401);
        }

        req.user = user;

        next();
    } catch (err) {
        //Unauthorized
        res.sendStatus(401);
    }
}