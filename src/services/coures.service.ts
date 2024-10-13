import { ICourse } from "../interfaces/interface";
import { Course } from "../schemas/courses.schema";

export const createCourse = async (courseData: ICourse) => {
    try {
        const { title, description, instructor, price, category, level, duration, imageUrl, resources } = courseData;
        if (!title || !description || !instructor || !price || !category || !level || !duration || !imageUrl) {
            throw new Error("All these fields are required");
        }

        const newCourse = new Course({
            uid: crypto.randomUUID(),
            title,
            description,
            instructor,
            price,
            category,
            level,
            duration,
            imageUrl,
            resources
        });
        const result = await newCourse.save();
        return { success: true, message: "Course created successfully", course: result };
    } catch (error) {
        throw error;
    }
};

export const addModuleToCourse = async (id: any, courseData: Partial<ICourse>) => {
    try {
        if (courseData.modules) {
            const updatedCourse = await Course.findByIdAndUpdate(
                id,
                {
                    $push: { modules: { $each: courseData.modules } }
                },
                { new: true }
            );
            if (!updatedCourse) {
                throw new Error("Course not found");
            }
            return { success: true, message: "Modules added successfully", course: updatedCourse };
        } else {
            const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });
            if (!updatedCourse) {
                throw new Error("Course not found");
            }
            return { success: true, message: "Course updated successfully", course: updatedCourse };
        }
    } catch (error) {
        throw error;
    }
};

export const addQuizToCourse = async (courseId: string, quizData: any) => {
    try {
        const { title, questions } = quizData;
        if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
            throw new Error("Title and at least one question are required");
        }

        // Validate each question
        questions.forEach(question => {
            if (!question.question || !Array.isArray(question.options) || question.options.length === 0 || !question.correctAnswer) {
                throw new Error("Each question must have a question text, options, and a correct answer");
            }
        });

        const newQuiz = {
            title,
            questions: questions.map(q => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer
            }))
        };

        const course = await Course.findByIdAndUpdate(
            courseId,
            { $push: { quizzes: newQuiz } },
            { new: true }
        );

        if (!course) {
            throw new Error("Course not found");
        }

        return { success: true, message: "Quiz added successfully", course: course };
    } catch (error) {
        throw error;
    }
};

export const addResourceToCourse = async (courseId: string, resourceData: any) => {
    try {
        const { title, type, url } = resourceData;
        if (!title || !type || !url) {
            throw new Error("All fields (title, type, and url) are required");
        }

        const newResource = {
            title,
            type,
            url
        };

        const course = await Course.findByIdAndUpdate(
            courseId,
            { $push: { resources: newResource } },
            { new: true }
        );

        if (!course) {
            throw new Error("Course not found");
        }

        return { success: true, message: "Resource added successfully", course: course };
    } catch (error) {
        throw error;
    }
};



export const getAllCourses = async () => {
    try {
        const courses = await Course.find();
        return courses;
    } catch (error) {
        throw error;
    }
};
