"use strict";
/**
 * Main application file for the CodeMaster backend server.
 * This file sets up the Express application, configures middleware,
 * establishes database connection, and defines basic routes.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var mongo_config_1 = __importDefault(require("./config/mongo.config"));
var cors_1 = __importDefault(require("cors"));
// import helmet from 'helmet';
var user_route_1 = __importDefault(require("./routes/user.route"));
var instructor_route_1 = __importDefault(require("./routes/instructor.route"));
var course_route_1 = __importDefault(require("./routes/course.route"));
exports.app = (0, express_1.default)();
// Connect to the MongoDB database
(0, mongo_config_1.default)();
// Set the port for the server to listen on
var port = process.env.PORT;
// Middleware setup
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// app.use(helmet());
// Configure CORS for cross-origin requests
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    methods: ["*"],
    credentials: true,
}));
// User Routes
exports.app.use("".concat(process.env.API_PREFIX, "/user"), user_route_1.default);
exports.app.use("".concat(process.env.API_PREFIX, "/instructor"), instructor_route_1.default);
exports.app.use("".concat(process.env.API_PREFIX, "/course"), course_route_1.default);
// Define a simple root route
exports.app.get("".concat(process.env.API_PREFIX, "/"), function (res) {
    res.send('Hello World!');
});
// Global error handling middleware
exports.app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('An error occurred!');
});
exports.app.get('/', function (req, res) {
    res.send('hello world');
});
// Start the server
exports.app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
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
