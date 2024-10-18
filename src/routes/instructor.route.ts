import { Router } from "express";
import { LoginInstructor, RegisterInstructor, GetInstructorById, UpdateInstructor, DeleteInstructor, GetAllInstructors } from "../controllers/instructor.controller";
import { guard } from "../middlewares/guard.middleware";


const router = Router();

// Login route
// localhost:2002/api/instructor/login
router.post('/login-api', LoginInstructor);

// Register route
// localhost:2002/api/instructor/register-api
router.post('/register-api', RegisterInstructor);

// Get all instructors route
// localhost:2002/api/instructor/
router.get('/', guard, GetAllInstructors);

// Get instructor by ID route
// localhost:2002/api/instructor/id/:id
router.get('/id/:id', guard, GetInstructorById);

// Update instructor route
// localhost:2002/api/instructor/update/:id
router.put('/update/:id', guard, UpdateInstructor);

// Delete instructor route
// localhost:2002/api/instructor/delete/:id
router.delete('/delete/:id', guard, DeleteInstructor);


export default router;