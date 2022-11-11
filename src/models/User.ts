import mongoose, { Schema } from 'mongoose';

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            null: false,
        },
        password: {
            type: String,
            require: true,
            null: false,
        },
        name: {
            type: String,
            require: false,
            null: true,
        },
        surname: {
            type: String,
            require: false,
            null: true,
        },
        age: {
            type: String,
            require: false,
            null: true,
        },
        city: {
            type: String,
            require: false,
            null: true,
        },
        course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('User', User);
