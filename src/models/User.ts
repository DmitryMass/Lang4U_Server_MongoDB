import mongoose from 'mongoose';

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
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('User', User);
