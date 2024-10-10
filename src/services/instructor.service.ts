import { IInstructor } from "../interfaces/interface";
import { Instructor } from "../schemas/instructor.schema";

export const registerInstructor = async (instructorData: IInstructor) => {
    try {
        const { firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl } = instructorData;
        if (!firstname || !lastname || !email || !password) {
            return { success: false, message: "All fields are required" };
        }
        const existingInstructor = await Instructor.findOne({ email });
        if (existingInstructor) {
            return { success: false, message: "Instructor already exists" };
        }
        const instructor = new Instructor(instructorData);
        const result = await instructor.save();
        return { success: true, message: "Instructor created successfully", instructor: result };
    } catch (error) {
        throw error;
    }
};

export const loginInstructor = async (email: string, password: string) => {
    try {
        const instructor = await Instructor.findOne({ email });
        if (!instructor) {
            return { success: false, message: "Instructor not found" };
        }
        if (instructor.password !== password) {
            return { success: false, message: "Invalid password" };
        }
        return { success: true, message: "Instructor logged in successfully", instructor };
    } catch (error) {
        throw error;
    }
};

export const getInstructorById = async (id: any) => {
    try {
        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return { success: false, message: "Instructor not found" };
        }
        return { success: true, message: "Instructor fetched successfully", instructor };
    } catch (error) {
        throw error;
    }
};

export const getAllInstructors = async () => {
    try {
        const instructors = await Instructor.find();
        return { success: true, message: "Instructors fetched successfully", instructors };
    } catch (error) {
        throw error;
    }
};

export const updateInstructor = async (id: any, instructorData: IInstructor) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(id, instructorData, { new: true });
        if (!instructor) {
            return { success: false, message: "Instructor not found" };
        }
        return { success: true, message: "Instructor updated successfully", instructor };
    } catch (error) {
        throw error;
    }
};

export const deleteInstructor = async (id: any) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(id);
        if (!instructor) {
            return { success: false, message: "Instructor not found" };
        }
        return { success: true, message: "Instructor deleted successfully" };
    } catch (error) {
        throw error;
    }
};
