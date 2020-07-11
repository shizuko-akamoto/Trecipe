import mongoose from 'mongoose';
import Trecipe from './trecipe.interface';

const destWithStatus = new mongoose.Schema(
    {
        destUUID: { type: String, ref: 'Destination' },
        completed: Boolean,
    },
    { toObject: { virtuals: true }, toJSON: { virtuals: true }, id: false }
);

destWithStatus.virtual('destination', {
    ref: 'Destination',
    localField: 'destUUID',
    foreignField: 'uuid',
    justOne: true,
});

const trecipeSchema = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        description: String,
        owner: { type: String, ref: 'User' },
        isPrivate: Boolean,
        collaborators: [{ type: String, ref: 'User' }],
        image: String,
        destinations: [destWithStatus],
    },
    { timestamps: true }
);

const trecipeModel = mongoose.model<Trecipe & mongoose.Document>('Trecipe', trecipeSchema);

export default trecipeModel;
