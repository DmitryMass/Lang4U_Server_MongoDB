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
        course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('User', User);
