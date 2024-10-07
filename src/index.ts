/**
 * Main application file for the CodeMaster backend server.
 * This file sets up the Express application, configures middleware,
 * establishes database connection, and defines basic routes.
 */

import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import Dbconnect from './config/mongo.config';
export const app = express();
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.route';
// Connect to the MongoDB database
Dbconnect();

// Set the port for the server to listen on
const port = process.env.PORT;

// Middleware setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());

// Configure CORS for cross-origin requests
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["*"],
        credentials: true,
    })
);


// User Routes
app.use(`${process.env.API_PREFIX}/user`, userRoutes);












// Define a simple root route
app.get('/', (res: Response) => {
    res.send('Hello World!');
});

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('An error occurred!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/**
 * TODO for future developers:
 * 1. Implement proper route handlers and organize them in separate files
 * 2. Set up environment variables for configuration (e.g., PORT, DATABASE_URL)
 * 3. Implement authentication middleware
 * 4. Add more comprehensive error handling and logging
 * 5. Implement input validation for incoming requests
 * 6. Set up unit and integration tests
 * 7. Consider using a process manager like PM2 for production deployment
 */
