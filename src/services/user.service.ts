import { User } from "../schemas/user.schema";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/interface";
import { Course } from "../schemas/courses.schema";
import mongoose, { ObjectId } from "mongoose";
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

export const loginByMail = async (email: string, password: string): Promise<IUser | any> => {
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
            user
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Error logging in" };
    }
}

export const register = async (userData: IUser): Promise<IUser | any> => {
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
            profileImageUrl,
            role: "student", // Default role
            enrolledToCourses: [] // Initialize with an empty array
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
            user: newUser // Corrected to use newUser instead of user

        }
    } catch (error: any) {
        throw error;
    }
}

export const loginByGoogle = async (googleId: string): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Error logging in" };
    }
}

export const getUserById = async (id: string): Promise<IUser | any> => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return {
            success: true,
            message: "User fetched successfully",
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, message: "Error fetching user" };
    }
}

// export const getUserById = async (id: string) => {
//     try {
//         const user = await User.findById(id);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }


export const getUserByUId = async (uid: any): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, message: "Error fetching user" };
    }
}

export const updateUser = async (id: any, userData: IUser): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

export const deleteUser = async (id: any): Promise<IUser | any> => {
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

export const getAllUsers = async (): Promise<IUser | any> => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export const getUserByEmail = async (email: string): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

export const getUserByPhoneNumber = async (phoneNumber: any): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error fetching user by phone number:', error);
        return null;
    }
}

export const getUserByGoogleId = async (googleId: any): Promise<IUser | any> => {
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
            user: user ? user : null
        };
    } catch (error) {
        console.error('Error fetching user by Google ID:', error);
        return null;
    }
}

export const enrollToCourse = async (courseId: any, userId: any): Promise<IUser | any> => {
    try {
        // Vérification de l'ID de l'utilisateur
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return { success: false, message: "Invalid course ID" };
        }

        // Recherche de l'utilisateur par UID
        const user = await User.findOne({ uid: userId });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return { success: false, message: "Course not found" };
        }


        // Vérification si l'utilisateur est déjà inscrit au cours
        if (user.enrolledToCourses?.includes(courseId)) {
            return { success: false, message: "User already enrolled in this course" };
        }

        // Inscription de l'utilisateur au cours
        user.enrolledToCourses = user.enrolledToCourses && user.enrolledToCourses.length > 0 ? user.enrolledToCourses : [courseId];
        user.enrolledToCourses.push(courseId);
        await user.save();

        return { success: true, message: "User enrolled to course successfully" };
    } catch (error) {
        console.error('Error enrolling user to course:', error);
        return { success: false, message: "Error enrolling user to course" };
    }
};