"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var course_controller_1 = require("../controllers/course.controller");
var guard_middleware_1 = require("../middlewares/guard.middleware");
var router = express_1.default.Router();
// Create a new course
router.post('/create', course_controller_1.CreateCourse);
// Get all courses
router.get('/', course_controller_1.GetAllCourses);
// Get a specific course by ID
router.get('/id/:id', guard_middleware_1.guard, course_controller_1.GetCourseById);
// Get a specific course by ID
router.get('/instructor/:id', guard_middleware_1.guard, course_controller_1.GetCoursesByInstructorId);
// Update a course
router.put('/update/:id', guard_middleware_1.guard, course_controller_1.UpdateCourse);
// Delete a course
router.delete('/delete/:id', guard_middleware_1.guard, course_controller_1.DeleteCourse);
// Add a module to a course
router.post('/module/:id', guard_middleware_1.guard, course_controller_1.AddModuleToCourse);
// Add a quiz to a course
router.post('/quiz/:id', guard_middleware_1.guard, course_controller_1.AddQuizToCourse);
// Add a resource to a course
router.post('/ressources/:id', guard_middleware_1.guard, course_controller_1.AddResourceToCourse);
exports.default = router;
