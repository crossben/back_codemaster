import { Router } from "express";
import { LoginInstructor, RegisterInstructor, GetInstructorById, UpdateInstructor, DeleteInstructor, GetAllInstructors } from "../controllers/instructor.controller";

const router = Router();

// Login route
router.post('/login', LoginInstructor);

// Register route
router.post('/register', RegisterInstructor);

// Get all instructors route
router.get('/', GetAllInstructors);

// Get instructor by ID route
router.get('/id/:id', GetInstructorById);

// Update instructor route
router.put('/update/:id', UpdateInstructor);

// Delete instructor route
router.delete('/delete/:id', DeleteInstructor);


export default router;