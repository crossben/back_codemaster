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
    enrolledToCourses?: [any];
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
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


export interface IModule extends Document {
    name: string;
    description?: string;
    contenu?: string;
}
export interface IRessource extends Document {
    title: string;
    url?: string;
}

export interface IQuiz extends Document {
    title: string;
    questions: {
        correctAnswer: string;
        question: string;
        options: string[];
    };
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
    quizzes?: IQuiz[];
    resources?: IRessource[] | undefined;
}


export interface IEnrolledCourse extends Document {
    userId: Schema.Types.ObjectId;
    courseId: Schema.Types.ObjectId;
    courseTitle: string; // Added for quick reference
    enrollmentDate: Date;
    status: string;
}
