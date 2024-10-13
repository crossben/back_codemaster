import mongoose, { Schema, Document, Model } from 'mongoose';
import { IModule } from '../interfaces/interface';

// Define the schema with validation
const moduleSchema = new Schema<IModule>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    contenu: { type: String, trim: true },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Add pre-save hook for additional validation or transformation
moduleSchema.pre<IModule>('save', function (next) {
    if (!this.name) {
        return next(new Error('Name and description are required.'));
    }
    next();
});

// Create the model
const Module: Model<IModule> = mongoose.model<IModule>('Module', moduleSchema);

export default Module;