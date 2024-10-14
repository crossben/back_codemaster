import * as courseService from '../services/coures.service'; // Importing course service for course creation
import { Request, Response, NextFunction } from 'express'; // Importing Express types for request and response handling
import { ICourse } from '../interfaces/interface'; // Importing ICourse interface for course data type

// Function to create a new course
export const CreateCourse = async (req: Request, res: Response): Promise<ICourse | any> => {
    try {
        // Extracting course data from request body
        const { title, description, instructor, price, category, level, duration, imageUrl, resources } = req.body;
        // Validating if all required fields are present
        if (!title || !description || !instructor || !price || !category || !level || !duration || !imageUrl) {
            throw new Error("All these fields are required");
        }
        // Creating a course object with the extracted data
        const courseData = { title, description, instructor, price, category, level, duration, imageUrl, resources } as ICourse;
        // Calling the course service to create the course
        const result = await courseService.createCourse(courseData);
        // Sending a response based on the result of course creation
        res.status(result.success ? 201 : 400).json({ message: "course created successfully", result });
    } catch (error) {
        // Handling any errors that occur during course creation
    }
}