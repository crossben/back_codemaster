"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var mongoose_1 = require("mongoose");
var courseSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "https://i.imgur.com/x7HadsA.png"
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        default: "General",
    },
    level: {
        type: String,
        default: "Beginner",
    },
    duration: {
        type: String,
        default: "1 month",
    },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'users',
        required: true
    },
    enrolledStudents: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    requirements: {
        type: [String],
        default: [],
    },
    learningObjectives: {
        type: [String],
        default: [],
    },
    modules: {
        type: mongoose_1.Schema.Types.Array,
        default: [],
    },
    quizzes: [{
            title: {
                type: String,
                required: true,
            },
            questions: [{
                    question: {
                        type: String,
                        required: true,
                    },
                    options: {
                        type: [String],
                        required: true,
                    },
                    correctAnswer: {
                        type: String,
                        required: true,
                    },
                }],
            default: [],
        }],
    resources: {
        type: mongoose_1.Schema.Types.Array,
        default: [],
    },
}, {
    timestamps: true,
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
