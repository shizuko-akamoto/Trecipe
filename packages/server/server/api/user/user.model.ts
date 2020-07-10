import mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema(
    {
        username: String,
        displayName: String,
        email: String,
        password: String,
        trecipes: [String],
    },
    { timestamps: true }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
