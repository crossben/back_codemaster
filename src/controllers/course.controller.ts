import * as courseService from '../services/coures.service';
import { Request, Response, NextFunction } from 'express';
import { ICourse } from '../interfaces/interface';
import { messaging } from 'firebase-admin';

export const CreateCourse = async (req: Request, res: Response): Promise<ICourse | any> => {
    try {
        const { title, description, instructor, price, category, level, duration, imageUrl, resources } = req.body;
        if (!title || !description || !instructor || !price || !category || !level || !duration || !imageUrl) {
            throw new Error("All these fields are required");
        }
        const courseData = { title, description, instructor, price, category, level, duration, imageUrl, resources } as ICourse;
        const result = await courseService.createCourse(courseData);
        res.status(result.success ? 201 : 400).json({ message: "course created successffuly", result });
    } catch (error) {

    }
}