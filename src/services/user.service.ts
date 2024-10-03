import express, { Request, Response } from "express";
import authenticate from "../middlewares/auth.middleware";
import firebaseAdmin from "../config/firebase.config";

const router = express.Router();

interface CustomRequest extends Request {
    user?: any;
}

// router.get("/", authenticate, async (req: CustomRequest, res: Response, next: express.NextFunction) => {
//     try {
//         res.status(200).json(req.user);
//     } catch (error) {
//         next(error);
//     }
// });


router.post("/", async (req: CustomRequest, res: any) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            error:
                "Invalid request body. Must contain email, password, and name for user."
        });
    }
    try {
        const newFirebaseUser = await firebaseAdmin.auth.createUser({
            email,
            password
        });

        if (newFirebaseUser) {
            const userCollection = req.app.locals.db.collection("user");
            await userCollection.insertOne({
                email,
                name,
                firebaseId: newFirebaseUser.uid
            });
        }
        return res
            .status(200)
            .json({ success: "Account created successfully. Please sign in." });
    } catch (err: any) {
        if (err.code === "auth/email-already-exists") {
            return res
                .status(400)
                .json({ error: "User account already exists at email address." });
        }
        return res.status(500).json({ error: "Server error. Please try again" });
    }
});

export default router;