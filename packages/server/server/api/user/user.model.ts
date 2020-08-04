import mongoose from 'mongoose';
import { User } from '../../../../shared/models/user';

const userSchema = new mongoose.Schema(
    {
        username: String,
        displayName: String,
        email: String,
        password: String,
        profilePic: String,
        trecipes: [String],
    },
    { timestamps: true }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
