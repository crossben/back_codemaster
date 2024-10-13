import mongoose, { Model, mongo, Schema } from "mongoose";
import { IRessource } from "../interfaces/interface";

const ressourceSchema = new Schema<IRessource>({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
})

export const Ressource: Model<IRessource> = mongoose.model<IRessource>('Ressources', ressourceSchema)