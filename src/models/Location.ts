import mongoose, { Schema, model, models } from 'mongoose';

const LocationSchema = new Schema(
  {
    title: { type: String, required: true },
    district: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Natural Attraction', 'Historical Place', 'Cultural Heritage', 'Coastal Point', 'Other'],
      default: 'Natural Attraction',
    },
    attractions: [{ type: String }],
    directions: { type: String },
    nearbyPlaces: [{ type: String }],
  },
  { timestamps: true }
);

const Location = models.Location || model('Location', LocationSchema);

export default Location;
