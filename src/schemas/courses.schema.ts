import { Schema, model } from "mongoose";
import { ICourse } from "../interfaces/interface";


const courseSchema = new Schema<ICourse>({
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
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    instructor: { type: Schema.Types.ObjectId, ref: 'users', required: true },
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
    modules: { type: Schema.Types.Array },
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
    }],
    resources: [{
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }],
}, {
    timestamps: true,
});

export const Course = model<ICourse>("Course", courseSchema);


