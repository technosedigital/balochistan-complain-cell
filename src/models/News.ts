import mongoose, { Schema, model, models } from 'mongoose';

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Announcement', 'Press Release', 'Development', 'Community', 'Tourism'],
      default: 'Announcement',
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const News = models.News || model('News', NewsSchema);

export default News;
