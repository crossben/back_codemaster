import bcrypt from 'bcrypt';
import { model, Model, Schema } from "mongoose";
import { IInstructor } from "../interfaces/interface";

const instructorSchema = new Schema<IInstructor>({
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
        required: false,
    },
    role: {
        type: String,
        default: "instructor",
        required: true,
        immutable: true
    },
    courses: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        required: false,
    },
}, {
    timestamps: true,
});


// Pre-save middleware to hash the password
// Pre-save middleware to hash the password before saving
instructorSchema.pre('save', async function (this: any, next: () => void) {
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
instructorSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Mongoose model for User documents.
 * Used for CRUD operations on the 'User' collection in MongoDB.
 */
export const Instructor: Model<IInstructor> = model<IInstructor>('Instructor', instructorSchema);