
import mongoose, { Schema, Model, models } from 'mongoose';

const UserSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    avatar_url: { type: String, default: null },
}, { timestamps: true });

export const User = (models.User as Model<any>) || mongoose.model('User', UserSchema);
