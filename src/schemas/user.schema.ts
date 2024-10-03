import mongoose, { Document, Schema } from "mongoose"

/**
 * Interface representing a User document in MongoDB.
 * Extends the Mongoose Document type.
 */
interface IUser extends Document {
    uid: String,
    firstname: String,
    lastname: String,
    email: String,
    number?: String,
    password: String
}

/**
 * Mongoose schema for the User model.
 * Defines the structure and constraints for user documents in the database.
 */
const userSchema = new Schema<IUser>({
    uid: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
});

/**
 * Mongoose model for User documents.
 * Used for CRUD operations on the 'User' collection in MongoDB.
 */
export const User = mongoose.model<IUser>('User', userSchema);

/**
 * TODO for future developers:
 * 1. Implement email validation in the schema.
 * 2. Add a pre-save hook to hash passwords before storing.
 * 3. Consider adding timestamps for createdAt and updatedAt.
 * 4. Implement unique constraint on email and uid fields.
 * 5. Add methods for password comparison and user authentication.
 * 6. Consider implementing virtual fields (e.g., fullName).
 * 7. Add indexes to frequently queried fields for performance.
 */