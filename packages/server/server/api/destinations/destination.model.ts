import mongoose from 'mongoose';
import Destination from '../../../../shared/models/destination';

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
        userRatings: [Number],
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
