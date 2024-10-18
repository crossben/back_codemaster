import { ICourse, IRessource } from "../interfaces/interface";
import { Course } from "../schemas/courses.schema";


export const createCourse = async (courseData: ICourse) => {
    try {
        const {
            title,
            description,
            instructor,
            price,
            category,
            level,
            duration,
            imageUrl,
            enrolledStudents,
            rating,
            requirements,
            learningObjectives,
            modules,
            quizzes,
            resources
        } = courseData;

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
            enrolledStudents,
            rating,
            requirements,
            learningObjectives,
            modules,
            quizzes,
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
        // Vérifier si des modules sont présents dans courseData
        if (courseData.modules && courseData.modules.length > 0) {
            // Ajouter les modules au cours en utilisant l'opérateur $push avec $each
            const updatedCourse = await Course.findByIdAndUpdate(
                id,
                { $push: { modules: { $each: courseData.modules } } },
                { new: true }
            );

            // Vérifier si le cours existe
            if (!updatedCourse) {
                throw new Error("Course not found");
            }

            return { success: true, message: "Modules added successfully", course: updatedCourse };
        } else {
            // Si les modules ne sont pas présents, mettre à jour les autres champs du cours
            const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });

            if (!updatedCourse) {
                throw new Error("Course not found");
            }

            return { success: true, message: "Course updated successfully", course: updatedCourse };
        }
    } catch (error: any) {
        // Lancer une erreur en cas de problème
        throw new Error(`Error updating course: ${error.message}`);
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

export const addResourceToCourse = async (id: any, courseData: ICourse) => {
    try {
        if (courseData.resources && courseData.resources.length > 0) {
            const updatedCourse = await Course.findByIdAndUpdate(
                id,
                { $push: { resources: { $each: courseData.resources } } },
                { new: true }
            );

            // Vérifier si le cours existe
            if (!updatedCourse) {
                throw new Error("Course not found");
            }

            return { success: true, message: "Resource added successfully", course: updatedCourse };
        } else {
            // Si les Resource ne sont pas présents, mettre à jour les autres champs du cours
            const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });

            if (!updatedCourse) {
                throw new Error("Course not found");
            }

            return { success: true, message: "Course updated successfully", course: updatedCourse };
        }
    } catch (error: any) {
        // Lancer une erreur en cas de problème
        throw new Error(`Error updating course: ${error.message}`);
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


export const getCourseById = async (id: string) => {
    try {
        const course = await Course.findById(id);
        return course;
    } catch (error) {
        throw error;
    }
}

export const updateCourse = async (id: string, courseData: Partial<ICourse>) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });
        if (!updatedCourse) {
            throw new Error("Course not found");
        }
        return { success: true, message: "Course updated successfully", course: updatedCourse };
    } catch (error) {
        throw error;
    }
}

export const getCoursesByInstructorId = async (id: any) => {
    try {
        const courses = await Course.find({ instructor: id });
        return courses;
    } catch (error) {
        throw error;
    }
}

export const deleteCourse = async (id: string) => {
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            throw new Error("Course not found");
        }
        return { success: true, message: "Course deleted successfully" };
    } catch (error) {
        throw error;
    }
}