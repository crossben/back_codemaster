import { Request, Response } from "express";
import * as instructorService from "../services/instructor.service";
import { IInstructor } from "../interfaces/interface";

export const LoginInstructor = async (req: Request, res: Response): Promise<IInstructor | any> => {
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
        const result = await instructorService.loginInstructor(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: "An error occurred during login" });
    }
}

export const RegisterInstructor = async (req: Request, res: Response): Promise<IInstructor | any> => {
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
        const instructorData = { firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl } as IInstructor;
        const result = await instructorService.registerInstructor(instructorData);
        res.status(result.success ? 201 : 400).json({ message: "Instructor created successfully", result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const GetAllInstructors = async (req: Request, res: Response): Promise<IInstructor[] | any> => {
    try {
        const instructors = await instructorService.getAllInstructors();
        res.status(200).json({ success: true, message: "Instructors fetched successfully", instructors });
    } catch (error: any) {
        console.error('Error fetching instructors:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the instructors" });
    }
}

export const GetInstructorById = async (req: Request, res: Response): Promise<IInstructor | any> => {
    try {
        const { id } = req.params;
        const instructor = await instructorService.getInstructorById(id);
        if (!instructor) {
            return res.status(404).json({ success: false, message: "instructor not found" });
        }

        res.status(200).json({ success: true, message: "instructor fetched successfully", instructor });
    } catch (error: any) {
        console.error('Error fetching instructor:', error);
        res.status(500).json({ success: false, message: "An error occurred fetching the instructor" });
    }
}

export const UpdateInstructor = async (req: Request, res: Response): Promise<IInstructor | any> => {
    try {
        const { id } = req.params;
        const instructorData = req.body;
        const updatedInstructor = await instructorService.updateInstructor(id, instructorData);
        if (!updatedInstructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        res.status(200).json({ success: true, message: "Instructor updated successfully", updatedInstructor });
    } catch (error) {
        console.error('Error updating Instructor:', error);
        res.status(500).json({ success: false, message: "An error occurred updating the user" });
    }
}

export const DeleteInstructor = async (req: Request, res: Response): Promise<IInstructor | any> => {
    try {
        const { id } = req.params;
        const result = await instructorService.deleteInstructor(id);
        if (!result.success) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        res.status(200).json({ success: true, message: "Instructor deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting instructor:', error);
        res.status(500).json({ success: false, message: "An error occurred deleting the instructor" });
    }
}

