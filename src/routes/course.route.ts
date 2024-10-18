import express from 'express';
import {
    CreateCourse,
    GetCourseById,
    UpdateCourse,
    DeleteCourse,
    GetAllCourses,
    AddModuleToCourse,
    AddQuizToCourse,
    AddResourceToCourse
} from '../controllers/course.controller';
import { guard } from '../middlewares/guard.middleware';

const router = express.Router();

// Create a new course
router.post('/create', CreateCourse);

// Get all courses
router.get('/', GetAllCourses);

// Get a specific course by ID
router.get('/:id', guard, GetCourseById);

// Update a course
router.put('/:id', guard, UpdateCourse);

// Delete a course
router.delete('/:id', guard, DeleteCourse);

// Add a module to a course
router.post('/:id/modules', guard, AddModuleToCourse);

// Add a quiz to a course
router.post('/:id/quizzes', guard, AddQuizToCourse);

// Add a resource to a course
router.post('/:id/resources', guard, AddResourceToCourse);

export default router;
