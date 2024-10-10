import { Document, Schema } from "mongoose"

export interface IUser extends Document {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber?: string;
    googleId?: string;
    password?: string;
    profileImageUrl?: string;
    role: string;
    enrolledToCourses?: Schema.Types.ObjectId[];
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
}

export interface ICourse extends Document {
    uid: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    level: string;
    duration: string;
    instructorId: string;
    enrolledStudents: number;
    rating: number;
    requirements: string[];
    learningObjectives: string[];
    modules: {
        title: string;
        content: string;
        duration: string;
    }[];
    quizzes: {
        title: string;
        questions: {
            question: string;
            options: string[];
            correctAnswer: string;
        }[];
    }[];
    resources: {
        title: string;
        type: string;
        url: string;
    }[];
}

export interface IInstructor extends Document {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    googleId?: string;
    password?: string;
    profileImageUrl: string;
    role: string;
    courses: ICourse[];
}

export interface IEnrolledCourse extends Document {
    userId: Schema.Types.ObjectId;
    courseId: Schema.Types.ObjectId;
    courseTitle: string; // Added for quick reference
    enrollmentDate: Date;
    progress: number;
    status: string;
    lastAccessDate?: Date; // Optional: track when the user last accessed the course
}
