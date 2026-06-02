import mongoose, { Schema, model, models } from 'mongoose';

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    // Array of objects capturing registrations: { name: string, email: string, phone: string, registeredAt: Date }
    registrations: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Event = models.Event || model('Event', EventSchema);

export default Event;
