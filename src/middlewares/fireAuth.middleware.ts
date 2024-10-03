import { NextFunction, Request, Response } from "express";
import { app } from "../index";
import admin from 'firebase-admin';
import serviceAccount from '../config/firebase.config';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

interface CustomRequest extends Request {
    user?: any;
}

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            res.status(401).send('Unauthorized');
        }
    } else {
        res.status(401).send('No token provided');
    }
}

app.use((req: Request, res: Response, next: NextFunction) => verifyToken(req as CustomRequest, res, next));
