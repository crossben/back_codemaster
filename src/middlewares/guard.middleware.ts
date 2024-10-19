import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}

export const guard = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Vérification du token JWT
        const decoded = verify(token, jwtSecret);
        req.user = decoded; // Ajouter les informations de l'utilisateur au champ req.user

        return next(); // Passer au middleware suivant
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
