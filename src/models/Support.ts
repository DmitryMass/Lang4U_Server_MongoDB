import mongoose from 'mongoose';

const Support = new mongoose.Schema(
    {
        name: {
            type: String,
            null: false,
            require: true,
        },
        email: {
            type: String,
            require: true,
            null: false,
        },
        message: {
            type: String,
            null: true,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Support', Support);
