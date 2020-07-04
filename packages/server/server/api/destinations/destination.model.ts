import mongoose from 'mongoose';
import Destination, { DestinationCategory } from './destination.interface';

const destinationSchema = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        category: {
            type: [String],
            enum: Object.keys(DestinationCategory),
            get: (category: string) =>
                DestinationCategory[category as keyof typeof DestinationCategory],
            set: (category: DestinationCategory) => DestinationCategory[category],
        },
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
    { timestamps: true, toJSON: { getters: true } }
);

const destinationModel = mongoose.model<Destination & mongoose.Document>(
    'Destination',
    destinationSchema
);

export default destinationModel;
