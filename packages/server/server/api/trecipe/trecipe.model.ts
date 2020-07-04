import mongoose from 'mongoose';
import Trecipe from './trecipe.interface';

const destWithStatus = new mongoose.Schema({
    destUuid: String,
    completed: Boolean,
});

const trecipeSchema = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        description: String,
        owner: String,
        isPrivate: Boolean,
        collaborators: [String],
        image: String,
        destinations: [destWithStatus],
    },
    { timestamps: true }
);

const trecipeModel = mongoose.model<Trecipe & mongoose.Document>('Trecipe', trecipeSchema);

export default trecipeModel;
