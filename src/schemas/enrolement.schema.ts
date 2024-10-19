import { IEnrolledCourse } from "../interfaces/interface";
import { Schema, model, Model } from "mongoose";


const enrollmentSchema = new Schema<IEnrolledCourse>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    courseTitle: {
        type: String,
        default: ""
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
});


export const Enrollment: Model<IEnrolledCourse> = model('Enrollment', enrollmentSchema);