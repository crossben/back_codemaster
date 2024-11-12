"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollStudentToCourse = exports.AddResourceToCourse = exports.AddQuizToCourse = exports.AddModuleToCourse = exports.DeleteCourse = exports.GetCoursesByInstructorId = exports.UpdateCourse = exports.GetCourseById = exports.GetAllCourses = exports.CreateCourse = void 0;
var courseService = __importStar(require("../services/coures.service")); // Importing course service for course creation
// Function to create a new course
var CreateCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, instructor, price, category, level, duration, imageUrl, enrolledStudents, rating, requirements, learningObjectives, modules, quizzes, resources, courseData, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, instructor = _a.instructor, price = _a.price, category = _a.category, level = _a.level, duration = _a.duration, imageUrl = _a.imageUrl, enrolledStudents = _a.enrolledStudents, rating = _a.rating, requirements = _a.requirements, learningObjectives = _a.learningObjectives, modules = _a.modules, quizzes = _a.quizzes, resources = _a.resources;
                // Validation des champs requis
                if (!title || !description || !instructor || !price || !category || !level || !duration) {
                    return [2 /*return*/, res.status(400).json({ message: "Title, description, instructor, price, category, level, and duration are required" })];
                }
                courseData = {
                    uid: '', // L'UID sera généré par le service
                    title: title,
                    description: description,
                    instructor: instructor,
                    price: price,
                    category: category,
                    level: level,
                    duration: duration,
                    imageUrl: imageUrl,
                    enrolledStudents: enrolledStudents,
                    rating: rating,
                    requirements: requirements,
                    learningObjectives: learningObjectives,
                    modules: modules,
                    quizzes: quizzes,
                    resources: resources
                };
                return [4 /*yield*/, courseService.createCourse(courseData)];
            case 1:
                result = _b.sent();
                // Réponse en fonction du résultat de la création du cours
                res.status(result.success ? 201 : 400).json({ message: "Course created successfully", result: result });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                // Gestion des erreurs survenues pendant la création du cours
                res.status(500).json({ message: "An error occurred while creating the course", error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateCourse = CreateCourse;
var GetAllCourses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courses, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courseService.getAllCourses()];
            case 1:
                courses = _a.sent();
                if (!courses) {
                    throw new Error("No courses found");
                }
                // Sending a response with all the courses
                res.status(200).json(courses);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetAllCourses = GetAllCourses;
var GetCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, course, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, courseService.getCourseById(id)];
            case 1:
                course = _a.sent();
                if (!course) {
                    throw new Error("Course not found");
                }
                // Sending a response with the course data
                res.status(200).json(course);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetCourseById = GetCourseById;
var UpdateCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, courseData, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                courseData = req.body;
                return [4 /*yield*/, courseService.updateCourse(id, courseData)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of course update
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateCourse = UpdateCourse;
var GetCoursesByInstructorId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, courses, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, courseService.getCoursesByInstructorId(id)];
            case 1:
                courses = _a.sent();
                if (!courses) {
                    throw new Error("No courses found");
                }
                // Sending a response with all the courses by the instructor
                res.status(200).json(courses);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetCoursesByInstructorId = GetCoursesByInstructorId;
var DeleteCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, courseService.deleteCourse(id)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of course deletion
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteCourse = DeleteCourse;
var AddModuleToCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, moduleData, result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                moduleData = req.body;
                return [4 /*yield*/, courseService.addModuleToCourse(id, moduleData)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of module addition
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.AddModuleToCourse = AddModuleToCourse;
var AddQuizToCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, quizData, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                quizData = req.body;
                return [4 /*yield*/, courseService.addQuizToCourse(id, quizData)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of quiz addition
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.AddQuizToCourse = AddQuizToCourse;
var AddResourceToCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, resourceData, result, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                resourceData = req.body;
                return [4 /*yield*/, courseService.addResourceToCourse(id, resourceData)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of resource addition
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.AddResourceToCourse = AddResourceToCourse;
var EnrollStudentToCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, id, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseId = req.body.courseId;
                id = req.params.id;
                return [4 /*yield*/, courseService.enrollStudentToCourse(courseId, id)];
            case 1:
                result = _a.sent();
                // Sending a response based on the result of student enrollment
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                // Handling any errors that occur during student enrollment
                console.error(error_10); // Log the error for debugging
                res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.EnrollStudentToCourse = EnrollStudentToCourse;
