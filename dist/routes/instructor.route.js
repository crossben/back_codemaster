"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var instructor_controller_1 = require("../controllers/instructor.controller");
var router = (0, express_1.Router)();
// Login route
// localhost:2002/api/instructor/login
router.post('/login-api', instructor_controller_1.LoginInstructor);
// Register route
// localhost:2002/api/instructor/register-api
router.post('/register-api', instructor_controller_1.RegisterInstructor);
// Get all instructors route
// localhost:2002/api/instructor/
router.get('/', instructor_controller_1.GetAllInstructors);
// Get instructor by ID route
// localhost:2002/api/instructor/id/:id
router.get('/id/:id', instructor_controller_1.GetInstructorById);
// Update instructor route
// localhost:2002/api/instructor/update/:id
router.put('/update/:id', instructor_controller_1.UpdateInstructor);
// Delete instructor route
// localhost:2002/api/instructor/delete/:id
router.delete('/delete/:id', instructor_controller_1.DeleteInstructor);
exports.default = router;
