import { Document, Schema } from "mongoose"

export interface IUser extends Document {
    uid: any;
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

export interface IModule extends Document {
    name: string;
    description?: string;
    contenu?: string;
}
export interface IRessource extends Document {
    title: string;
    url?: string;
}

export interface ICourse extends Document {
    uid: any;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    level: string;
    duration: string;
    instructor: IInstructor['_id'];
    enrolledStudents?: number;
    rating?: number;
    requirements?: string[];
    learningObjectives?: string[];
    modules?: IModule[] | undefined;
    quizzes?: {
        title: string;
        questions: {
            question: string;
            options: string[];
            correctAnswer: string;
        }[];
    }[];
    resources?: IRessource[] | undefined;
}

export interface IInstructor extends Document {
    uid: any;
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
