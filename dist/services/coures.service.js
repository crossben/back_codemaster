"use strict";
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
exports.enrollStudentToCourse = exports.deleteCourse = exports.getCoursesByInstructorId = exports.updateCourse = exports.getCourseById = exports.getAllCourses = exports.addResourceToCourse = exports.addQuizToCourse = exports.addModuleToCourse = exports.createCourse = void 0;
var courses_schema_1 = require("../schemas/courses.schema");
var user_schema_1 = require("../schemas/user.schema");
var enrolement_schema_1 = require("../schemas/enrolement.schema");
var createCourse = function (courseData) { return __awaiter(void 0, void 0, void 0, function () {
    var title, description, instructor, price, category, level, duration, imageUrl, enrolledStudents, rating, requirements, learningObjectives, modules, quizzes, resources, newCourse, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                title = courseData.title, description = courseData.description, instructor = courseData.instructor, price = courseData.price, category = courseData.category, level = courseData.level, duration = courseData.duration, imageUrl = courseData.imageUrl, enrolledStudents = courseData.enrolledStudents, rating = courseData.rating, requirements = courseData.requirements, learningObjectives = courseData.learningObjectives, modules = courseData.modules, quizzes = courseData.quizzes, resources = courseData.resources;
                newCourse = new courses_schema_1.Course({
                    uid: crypto.randomUUID(),
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
                });
                return [4 /*yield*/, newCourse.save()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { success: true, message: "Course created successfully", course: result }];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCourse = createCourse;
var addModuleToCourse = function (id, courseData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCourse, updatedCourse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(courseData.modules && courseData.modules.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, { $push: { modules: { $each: courseData.modules } } }, { new: true })];
            case 1:
                updatedCourse = _a.sent();
                // Vérifier si le cours existe
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Modules added successfully", course: updatedCourse }];
            case 2: return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, courseData, { new: true })];
            case 3:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Course updated successfully", course: updatedCourse }];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                // Lancer une erreur en cas de problème
                throw new Error("Error updating course: ".concat(error_2.message));
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addModuleToCourse = addModuleToCourse;
var addQuizToCourse = function (id, courseData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCourse, updatedCourse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(courseData.quizzes && courseData.quizzes.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, { $push: { quizzes: { $each: courseData.quizzes } } }, { new: true })];
            case 1:
                updatedCourse = _a.sent();
                // Vérifier si le cours existe
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Quizzes added successfully", course: updatedCourse }];
            case 2: return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, courseData, { new: true })];
            case 3:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Course updated successfully", course: updatedCourse }];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                // Lancer une erreur en cas de problème
                throw new Error("Error updating course: ".concat(error_3.message));
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addQuizToCourse = addQuizToCourse;
var addResourceToCourse = function (id, courseData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCourse, updatedCourse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(courseData.resources && courseData.resources.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, { $push: { resources: { $each: courseData.resources } } }, { new: true })];
            case 1:
                updatedCourse = _a.sent();
                // Vérifier si le cours existe
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Resource added successfully", course: updatedCourse }];
            case 2: return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, courseData, { new: true })];
            case 3:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Course updated successfully", course: updatedCourse }];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                // Lancer une erreur en cas de problème
                throw new Error("Error updating course: ".concat(error_4.message));
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addResourceToCourse = addResourceToCourse;
var getAllCourses = function () { return __awaiter(void 0, void 0, void 0, function () {
    var courses, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courses_schema_1.Course.find()];
            case 1:
                courses = _a.sent();
                return [2 /*return*/, courses];
            case 2:
                error_5 = _a.sent();
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCourses = getAllCourses;
var getCourseById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var course, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courses_schema_1.Course.findById(id)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
            case 2:
                error_6 = _a.sent();
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCourseById = getCourseById;
var updateCourse = function (id, courseData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCourse, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courses_schema_1.Course.findByIdAndUpdate(id, courseData, { new: true })];
            case 1:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Course updated successfully", course: updatedCourse }];
            case 2:
                error_7 = _a.sent();
                throw error_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCourse = updateCourse;
var getCoursesByInstructorId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var courses, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courses_schema_1.Course.find({ instructor: id })];
            case 1:
                courses = _a.sent();
                return [2 /*return*/, courses];
            case 2:
                error_8 = _a.sent();
                throw error_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCoursesByInstructorId = getCoursesByInstructorId;
var deleteCourse = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var course, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, courses_schema_1.Course.findByIdAndDelete(id)];
            case 1:
                course = _a.sent();
                if (!course) {
                    throw new Error("Course not found");
                }
                return [2 /*return*/, { success: true, message: "Course deleted successfully" }];
            case 2:
                error_9 = _a.sent();
                throw error_9;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCourse = deleteCourse;
var enrollStudentToCourse = function (courseId, studentId) { return __awaiter(void 0, void 0, void 0, function () {
    var course, student, enrolled, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, courses_schema_1.Course.findById(courseId)];
            case 1:
                course = _a.sent();
                if (!course) {
                    throw new Error("Course not found");
                }
                return [4 /*yield*/, user_schema_1.User.findById(studentId)];
            case 2:
                student = _a.sent();
                if (!student) {
                    throw new Error("Student not found");
                }
                enrolled = new enrolement_schema_1.Enrollment({
                    courseId: courseId,
                    courseTitle: course.title,
                    userId: studentId,
                });
                return [4 /*yield*/, enrolled.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true, message: "Student enrolled successfully" }];
            case 4:
                error_10 = _a.sent();
                throw new Error("Error enrolling student: ".concat(error_10.message));
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.enrollStudentToCourse = enrollStudentToCourse;
// export const enrollStudentToCourse = async (id: any, userData: IUser) => {
//     try {
//         if (userData.enrolledToCourses && userData.enrolledToCourses.length > 0) {
//             // const course = await Course.findById(courseId);
//             const updatedUser = await User.findByIdAndUpdate(
//                 id,
//                 { $push: { enrolledToCourses: { $each: userData.enrolledToCourses } } },
//                 { new: true }
//             );
//             // Vérifier si l'utilisateur existe
//             if (!updatedUser) {
//                 throw new Error("User not found");
//             }
//             return { success: true, message: "Courses added to user successfully", user: updatedUser };
//         } else {
//             // Si les cours ne sont pas présents, mettre à jour les autres champs de l'utilisateur
//             const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
//             if (!updatedUser) {
//                 throw new Error("User not found");
//             }
//             return { success: true, message: "User updated successfully", user: updatedUser };
//         }
//     } catch (error: any) {
//         throw new Error(`Error enrolling student: ${error.message}`);
//     }
// }
