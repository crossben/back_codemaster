import express, { Request, Response, Router } from "express";
import { User } from "../schemas/user.schema";
import { compare } from "bcrypt";
// import authenticate from "../middlewares/auth.middleware";
// import firebaseAdmin from "../config/firebase.config";

// const router = Router();

// interface CustomRequest extends Request {
//     user?: any;
// }

// router.get("/", authenticate, async (req: CustomRequest, res: Response, next: express.NextFunction) => {
//     try {
//         res.status(200).json(req.user);
//     } catch (error) {
//         next(error);
//     }
// });


// router.post("/", async (req: CustomRequest, res: any) => {
//     const { email, name, password } = req.body;

//     if (!email || !name || !password) {
//         return res.status(400).json({
//             error:
//                 "Invalid request body. Must contain email, password, and name for user."
//         });
//     }
//     try {
//         const newFirebaseUser = await firebaseAdmin.auth.createUser({
//             email,
//             password
//         });

//         if (newFirebaseUser) {
//             const userCollection = req.app.locals.db.collection("user");
//             await userCollection.insertOne({
//                 email,
//                 name,
//                 firebaseId: newFirebaseUser.uid
//             });
//         }
//         return res
//             .status(200)
//             .json({ success: "Account created successfully. Please sign in." });
//     } catch (err: any) {
//         if (err.code === "auth/email-already-exists") {
//             return res
//                 .status(400)
//                 .json({ error: "User account already exists at email address." });
//         }
//         return res.status(500).json({ error: "Server error. Please try again" });
//     }
// });

// export default router;

export const loginByMail = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (!user.password) {
            return { success: false, message: "User account requires different authentication method" };
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid password" };
        }

        // Generate a JWT token or session for the user
        // const token = generateToken(user);

        return {
            success: true,
            message: "User logged in successfully",
            // token: token,
            user: {
                uid: user.uid,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Error logging in" };
    }
}

export const SignUp = async (userData: any) => {
    try {
        const { firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl } = userData;
        if (!firstname || !lastname || !email || !password) {
            return { success: false, message: "All fields are required" };
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }
        const newUser = new User({
            uid: crypto.randomUUID(),
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            googleId,
            profileImageUrl
        });

        await newUser.save();

        return { success: true, message: "User created successfully" };
    } catch (error: any) {
        console.error('SignUp error:', error);
        return { success: false, message: "Error creating user" };
    }
}

export const loginByGoogle = async (googleId: string) => {
    try {
        const user = await User.findOne({ googleId });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return {
            success: true,
            message: "User logged in successfully",
            user: {
                uid: user.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                googleId: user.googleId,
                profileImageUrl: user.profileImageUrl
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Error logging in" };
    }
}

export const getUserById = async (uid: string) => {
    try {
        const user = await User.findOne({ uid });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export const updateUser = async (uid: string, userData: any) => {
    try {
        const user = await User.findOneAndUpdate({ uid }, userData, { new: true });
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

export const deleteUser = async (uid: string) => {
    try {
        await User.findOneAndDelete({ uid });
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: "Error deleting user" };
    }
}

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

export const getUserByPhoneNumber = async (phoneNumber: string) => {
    try {
        const user = await User.findOne({ phoneNumber });
        return user;
    } catch (error) {
        console.error('Error fetching user by phone number:', error);
        return null;
    }
}

export const getUserByGoogleId = async (googleId: string) => {
    try {
        const user = await User.findOne({ googleId });
        return user;
    } catch (error) {
        console.error('Error fetching user by Google ID:', error);
        return null;
    }
}

export const getUserByUid = async (uid: string) => {
    try {
        const user = await User.findOne({ uid });
        return user;
    } catch (error) {
        console.error('Error fetching user by UID:', error);
        return null;
    }
}

