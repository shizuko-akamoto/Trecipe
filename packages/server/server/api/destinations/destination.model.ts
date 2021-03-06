import mongoose from 'mongoose';
import Destination from '../../../../shared/models/destination';

const userRating = new mongoose.Schema(
    {
        userId: { type: String, ref: 'User' },
        rating: Number,
    },
    { id: false, timestamps: true }
);

const destinationSchema = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        category: [String],
        geometry: {
            lat: Number,
            lng: Number,
        },
        formattedAddress: String,
        formattedPhoneNumber: String,
        website: String,
        rating: Number,
        userRatings: [userRating],
        description: String,
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
