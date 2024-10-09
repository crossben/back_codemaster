import { Request, Response } from "express";
import { loginByMail, loginByGoogle, SignUp, getUserByUId, getAllUsers, deleteUser, updateUser, getUserByEmail, getUserByPhoneNumber, getUserByGoogleId, getUserById } from "../services/user.service";

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        // Data validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid input types" });
        }
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        // Minimum password length check
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }
        const result = await loginByMail(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: "An error occurred during login" });
    }
}

export const GoogleLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { googleId } = req.body;

        // Data validation
        if (!googleId) {
            return res.status(400).json({ success: false, message: "Google ID is required" });
        }
        if (typeof googleId !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid input type for Google ID" });
        }
        if (googleId.length < 21) {
            return res.status(400).json({ success: false, message: "Invalid Google ID format" });
        }

        // Additional validation
        const googleIdRegex = /^[0-9]{21}$/; // Assuming Google ID is a 21-digit number
        if (!googleIdRegex.test(googleId)) {
            return res.status(400).json({ success: false, message: "Invalid Google ID format" });
        }

        try {
            const result = await loginByGoogle(googleId);
            res.status(200).json(result);
        } catch (loginError: any) {
            console.error('Google Login error:', loginError);
            res.status(500).json({ success: false, message: "An error occurred during Google login" });
        }
    } catch (error: any) {
        console.error('Google Login error:', error);
        res.status(500).json({ success: false, message: "An error occurred processing the request" });
    }
}

export const Sign = async (req: Request, res: Response): Promise<any> => {
    try {
        const { firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl } = req.body;

        // Data validation
        if (!firstname || !lastname || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All required fields must be provided" });
        }

        if (typeof firstname !== 'string' || typeof lastname !== 'string' ||
            typeof email !== 'string' || typeof password !== 'string' ||
            typeof phoneNumber !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid input types" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Phone number format validation (basic check, can be improved)
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format" });
        }

        const userData = { firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl };
        const result = await SignUp(userData);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ success: false, message: "An error occurred during sign up" });
    }
}


export const GetUserById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (error: any) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the user" });
    }
}

export const GetUserByUId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { uid } = req.params;
        const user = await getUserByUId(uid);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (error: any) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the user" });
    }
}

export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = await updateUser(id, userData);
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: "An error occurred updating the user" });
    }
}

export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const result = await deleteUser(id);
        if (!result.success) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: "An error occurred deleting the user" });
    }
}

export const GetAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ success: true, message: "Users fetched successfully", users });
    } catch (error: any) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the users" });
    }
}

export const GetUserByMail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (error: any) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the user by email" });
    }
}

export const GetUserByPhoneNumber = async (req: Request, res: Response): Promise<any> => {
    try {
        const { phoneNumber } = req.params;
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (error: any) {
        console.error('Error fetching user by phone number:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the user by phone number" });
    }
}

export const GetUserByGoogleId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { googleId } = req.params;
        const user = await getUserByGoogleId(googleId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (error: any) {
        console.error('Error fetching user by Google ID:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the user by Google ID" });
    }
}