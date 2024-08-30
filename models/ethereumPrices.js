import mongoose, { Schema } from 'mongoose';

const pricesSchema = new Schema({
    inr: {
        type: Number,
        required: true,
    }
},{timestamps: true});

export const Prices = mongoose.model('Prices', pricesSchema);