import { ICourse, IUser } from "../interfaces/interface";
import { Course } from "../schemas/courses.schema";
import { User } from "../schemas/user.schema";
import { Enrollment } from '../schemas/enrolement.schema'



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


export const addQuizToCourse = async (id: string, courseData: Partial<ICourse>) => {
    try {
        if (courseData.quizzes && courseData.quizzes.length > 0) {
            // Ajouter les modules au cours en utilisant l'opérateur $push avec $each
            const updatedCourse = await Course.findByIdAndUpdate(
                id,
                { $push: { quizzes: { $each: courseData.quizzes } } },
                { new: true }
            );

            // Vérifier si le cours existe
            if (!updatedCourse) {
                throw new Error("Course not found");
            }

            return { success: true, message: "Quizzes added successfully", course: updatedCourse };
        } else {
            // Si les quizzes ne sont pas présents, mettre à jour les autres champs du cours
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


export const enrollStudentToCourse = async (courseId: string, studentId: string) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const student = await User.findById(studentId);
        if (!student) {
            throw new Error("Student not found");
        }

        const enrolled = new Enrollment({
            courseId: courseId,
            courseTitle: course.title,
            userId: studentId,
        });

        await enrolled.save();

        return { success: true, message: "Student enrolled successfully" };
    } catch (error: any) {
        throw new Error(`Error enrolling student: ${error.message}`);
    }
}


// export const enrollStudentToCourse = async (id: any, userData: IUser) => {
//     try {
//         if (userData.enrolledToCourses && userData.enrolledToCourses.length > 0) {
//             // const course = await Course.findById(courseId);
//             const updatedUser = await User.findByIdAndUpdate(
//                 id,
//                 { $push: { enrolledToCourses: { $each: userData.enrolledToCourses } } },
//                 { new: true }
//             );

//             // Vérifier si l'utilisateur existe
//             if (!updatedUser) {
//                 throw new Error("User not found");
//             }

//             return { success: true, message: "Courses added to user successfully", user: updatedUser };
//         } else {
//             // Si les cours ne sont pas présents, mettre à jour les autres champs de l'utilisateur
//             const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });

//             if (!updatedUser) {
//                 throw new Error("User not found");
//             }

//             return { success: true, message: "User updated successfully", user: updatedUser };
//         }
//     } catch (error: any) {
//         throw new Error(`Error enrolling student: ${error.message}`);
//     }
// }
