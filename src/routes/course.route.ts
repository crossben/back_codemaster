import express from 'express';
import { CreateCourse, GetCourseById, UpdateCourse, DeleteCourse, GetAllCourses, AddModuleToCourse, AddQuizToCourse, AddResourceToCourse, GetCoursesByInstructorId, EnrollStudentToCourse } from '../controllers/course.controller';

import { guard } from '../middlewares/guard.middleware';

const router = express.Router();

// Create a new course
router.post('/create', guard, CreateCourse);

// Get all courses
router.get('/', GetAllCourses);

// Get a specific course by ID
router.get('/id/:id', guard, guard, GetCourseById);

// Get a specific course by ID
router.get('/instructor/:id', guard, GetCoursesByInstructorId);

// Update a course
router.put('/update/:id', guard, UpdateCourse);

// Delete a course
router.delete('/delete/:id', guard, DeleteCourse);

// Add a module to a course
router.post('/module/:id', guard, AddModuleToCourse);

// Add a quiz to a course
router.post('/quiz/:id', guard, AddQuizToCourse);

// Add a resource to a course
router.post('/ressources/:id', guard, AddResourceToCourse);

router.post('/enroll/:id', EnrollStudentToCourse);   

export default router;
