import mongoose, { model, Model, Schema } from "mongoose";
import { IQuiz } from "../interfaces/interface";


const quizSchema = new Schema<IQuiz>({
    title: {
        type: String,
        questions: {
            correctAnswer: {
                type: String,
                required: true,
            },
            question: {
                type: String,
                required: true
            },
            options: {
                type: Schema.Types.Array,
                default: []
            }
        }
    }
});

export const Quiz: Model<IQuiz> = model<IQuiz>('Quiz', quizSchema)