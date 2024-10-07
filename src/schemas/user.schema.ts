import bcrypt from 'bcrypt';
import mongoose, { Schema } from "mongoose"
import { IUser } from "../interfaces/interface"

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
    phoneNumber: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "https://i.imgur.com/m7pNWV9.png",
        required: false,
    },
    enrolledToCourses: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        required: false,
    },
}, {
    timestamps: true,
}
);


// Pre-save middleware to hash the password
// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (this: any, next: () => void) {
    // Check if the password field has been modified
    if (!this.isModified('password')) {
        return next();
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    // Continue with the save operation
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

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

// Sample JSON for testing the User API
const sampleUserJSON = {
    "uid": "12345",
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "+1234567890",
    "googleId": "google123456",
    "password": "securePassword123",
    "profileImageUrl": "https://example.com/profile.jpg",
    "enrolledToCourses": ["60d5ecb74f52a531a4d1a346", "60d5ecb74f52a531a4d1a347"]
};

// console.log(JSON.stringify(sampleUserJSON, null, 2));