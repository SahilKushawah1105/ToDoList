import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the User document
export interface ITodo extends Document {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    user_id: mongoose.Schema.Types.ObjectId
    created_at: Date;
    updated_at: Date;
}

// Define the schema
const todoSchema: Schema<ITodo> = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        dueDate: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const ToDo = mongoose.model("ToDO", todoSchema);
export default ToDo;
