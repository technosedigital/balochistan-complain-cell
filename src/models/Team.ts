import mongoose, { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, // Position
    image: { type: String, required: true },
    bio: { type: String, required: false },
    socials: {
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      email: { type: String, default: '' },
      facebook: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const Team = models.Team || model('Team', TeamSchema);

export default Team;
