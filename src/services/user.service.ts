import { User } from "../schemas/user.schema";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/interface";
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
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";

        return {
            success: true,
            message: "User logged in successfully",
            token: token,
            user: {
                id: user._id,
                uid: user.uid,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber,
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Error logging in" };
    }
}

export const register = async (userData: IUser) => {
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

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ _id: newUser.id }, jwtSecret) || "no token";

        return {
            success: true,
            message: "User created successfully",
            token: token,
            user: {
                id: newUser._id,
                uid: newUser.uid,
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                phoneNumber: newUser.phoneNumber,
            }
        };
    } catch (error) {
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
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User logged in successfully",
            token: token,
            user: {
                id: user._id,
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

export const getUserById = async (id: any) => {
    try {
        const user = await User.findOne({ _id: id });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        // const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            // token: token,
            user: user ? {
                id: user._id,
                uid: user.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                googleId: user.googleId,
                profileImageUrl: user.profileImageUrl
            } : null
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, message: "Error fetching user" };
    }
}
export const getUserByUId = async (uid: any) => {
    try {
        const user = await User.findOne({ uid });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        // const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            // token: token,
            user: user ? {
                id: user._id,
                uid: user.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                googleId: user.googleId,
                profileImageUrl: user.profileImageUrl
            } : null
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, message: "Error fetching user" };
    }
}

export const updateUser = async (id: any, userData: IUser) => {
    try {
        const user = await User.findOneAndUpdate({ _id: id }, userData, { new: true });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            token: token,
            user: {
                id: user._id,
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
        console.error('Error updating user:', error);
        return null;
    }
}

export const deleteUser = async (id: any) => {
    try {
        await User.findOneAndDelete({ _id: id });
        if (!User) {
            return { success: false, message: "User not found" };
        }
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
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const token = jwt.sign({ id: user.id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            token: token,
            user: {
                id: user._id,
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
        console.error('Error fetching user by email:', error);
        return null;
    }
}

export const getUserByPhoneNumber = async (phoneNumber: any) => {
    try {
        const user = await User.findOne({ phoneNumber });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const token = jwt.sign({ id: user._id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            token: token,
            user: user ? {
                id: user._id,
                uid: user.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                googleId: user.googleId,
                profileImageUrl: user.profileImageUrl
            } : null
        };
    } catch (error) {
        console.error('Error fetching user by phone number:', error);
        return null;
    }
}

export const getUserByGoogleId = async (googleId: any) => {
    try {
        const user = await User.findOne({ googleId });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const token = jwt.sign({ id: user._id }, jwtSecret) || "no token";
        return {
            success: true,
            message: "User fetched successfully",
            token: token,
            user: {
                id: user._id,
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
        console.error('Error fetching user by Google ID:', error);
        return null;
    }
}