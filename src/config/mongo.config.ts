import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const Dbconnect = async () => {
    const MONGODB_URI = process.env.MONGO_DB_URI;

    if (MONGODB_URI) {
        try {
            await mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    } else {
        console.error("MONGODB_URI is undefined.");
        process.exit(1);
    }
};

export default Dbconnect;