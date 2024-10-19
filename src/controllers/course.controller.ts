import * as courseService from '../services/coures.service'; // Importing course service for course creation
import { Request, Response, NextFunction } from 'express'; // Importing Express types for request and response handling
import { ICourse, IEnrolledCourse, IModule, IQuiz, IRessource } from '../interfaces/interface'; // Importing ICourse interface for course data type

// Function to create a new course
export const CreateCourse = async (req: Request, res: Response): Promise<ICourse | any> => {
    try {
        // Extraction des données du cours depuis le corps de la requête
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
        } = req.body;

        // Validation des champs requis
        if (!title || !description || !instructor || !price || !category || !level || !duration) {
            return res.status(400).json({ message: "Title, description, instructor, price, category, level, and duration are required" });
        }

        // Création d'un objet courseData avec les données extraites
        const courseData = {
            uid: '', // L'UID sera généré par le service
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
        } as ICourse;

        // Appel du service pour créer le cours
        const result = await courseService.createCourse(courseData);

        // Réponse en fonction du résultat de la création du cours
        res.status(result.success ? 201 : 400).json({ message: "Course created successfully", result });
    } catch (error: any) {
        // Gestion des erreurs survenues pendant la création du cours
        res.status(500).json({ message: "An error occurred while creating the course", error: error.message });
    }
};

export const GetAllCourses = async (req: Request, res: Response): Promise<ICourse[] | any> => {
    try {
        // Calling the course service to get all courses
        const courses = await courseService.getAllCourses();
        if (!courses) {
            throw new Error("No courses found");
        }
        // Sending a response with all the courses
        res.status(200).json(courses);
    } catch (error) {
        // Handling any errors that occur during fetching all courses
    }
}

export const GetCourseById = async (req: Request, res: Response): Promise<ICourse | any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Calling the course service to get course by id
        const course = await courseService.getCourseById(id);
        if (!course) {
            throw new Error("Course not found");
        }
        // Sending a response with the course data
        res.status(200).json(course);
    } catch (error) {
        // Handling any errors that occur during fetching course by id
    }
}

export const UpdateCourse = async (req: Request, res: Response): Promise<ICourse | any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Extracting course data from request body
        const courseData = req.body;
        // Calling the course service to update the course
        const result = await courseService.updateCourse(id, courseData);
        // Sending a response based on the result of course update
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during course update
    }
}

export const GetCoursesByInstructorId = async (req: Request, res: Response): Promise<ICourse[] | any> => {
    try {
        // Extracting instructor id from request params
        const { id } = req.params;
        // Calling the course service to get courses by instructor id
        const courses = await courseService.getCoursesByInstructorId(id);
        if (!courses) {
            throw new Error("No courses found");
        }
        // Sending a response with all the courses by the instructor
        res.status(200).json(courses);
    } catch (error) {
        // Handling any errors that occur during fetching courses by instructor id
    }
}


export const DeleteCourse = async (req: Request, res: Response): Promise<any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Calling the course service to delete the course
        const result = await courseService.deleteCourse(id);
        // Sending a response based on the result of course deletion
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during course deletion
    }
}

export const AddModuleToCourse = async (req: Request, res: Response): Promise<IModule | any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Extracting module data from request body
        const moduleData = req.body;
        // Calling the course service to add module to course
        const result = await courseService.addModuleToCourse(id, moduleData);
        // Sending a response based on the result of module addition
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during module addition
    }
}

export const AddQuizToCourse = async (req: Request, res: Response): Promise<IQuiz | any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Extracting quiz data from request body
        const quizData = req.body;
        // Calling the course service to add quiz to course
        const result = await courseService.addQuizToCourse(id, quizData);
        // Sending a response based on the result of quiz addition
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during quiz addition
    }
}

export const AddResourceToCourse = async (req: Request, res: Response): Promise<IRessource | any> => {
    try {
        // Extracting course id from request params
        const { id } = req.params;
        // Extracting resource data from request body
        const resourceData = req.body;
        // Calling the course service to add resource to course
        const result = await courseService.addResourceToCourse(id, resourceData);
        // Sending a response based on the result of resource addition
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during resource addition
    }
}

export const EnrollStudentToCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extracting course id and student id from request body
        const { courseId } = req.body;
        const { id } = req.params;

        // Calling the course service to enroll student to course
        const result = await courseService.enrollStudentToCourse(courseId, id);

        // Sending a response based on the result of student enrollment
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handling any errors that occur during student enrollment
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
    }
}