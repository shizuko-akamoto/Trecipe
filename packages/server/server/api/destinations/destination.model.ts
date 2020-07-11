import mongoose from 'mongoose';
import Destination from './destination.interface';

const destinationSchema = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        category: [String],
        geometry: {
            lat: Number,
            lon: Number,
        },
        formattedAddress: String,
        formattedPhoneNumber: String,
        website: String,
        rating: Number,
        userRatings: [Number],
        placeId: String,
        photoRefs: [String],
    },
    { timestamps: true }
);

const destinationModel = mongoose.model<Destination & mongoose.Document>(
    'Destination',
    destinationSchema
);

export default destinationModel;
