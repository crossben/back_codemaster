import { Model, Schema, model } from "mongoose";
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
        type: Schema.Types.ObjectId, ref: 'users',
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
        type: Schema.Types.Array,
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
        type: Schema.Types.Array,
        default: [],
    },
}, {
    timestamps: true,
});

export const Course: Model<ICourse> = model<ICourse>("Course", courseSchema);


