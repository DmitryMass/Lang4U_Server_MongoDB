import mongoose from 'mongoose';

const Course = new mongoose.Schema(
    {
        logo: {
            type: String,
            null: false,
        },
        title: {
            type: String,
            null: false,
        },
        duration: {
            type: String,
            null: false,
        },
        modules: {
            type: String,
            null: false,
        },
        details: {
            type: String,
            null: false,
        },
        price: {
            type: String,
            null: false,
        },
        color: {
            type: String,
            null: false,
        },
        link: {
            type: String,
            null: false,
        },
        lessons: {
            type: String,
            null: false,
        },
        task: {
            type: String,
            null: false,
        },
        tests: {
            type: String,
            null: false,
        },
        expert: {
            type: String,
            null: false,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Course', Course);
