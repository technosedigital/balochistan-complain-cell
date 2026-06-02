import mongoose, { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ComplaintSchema = new Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    // Submitter personal details
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    
    // Complaint details
    category: {
      type: String,
      required: true,
      enum: [
        'Water Supply',
        'Electricity Outage',
        'Gas Pipeline/Supply',
        'Sewerage & Drainage',
        'Road Damage',
        'Pipeline Leakage',
        'Street Lights',
        'Waste Management',
        'Public Safety',
        'Internet/Communication',
        'Other Civic Issues',
      ],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    description: { type: String, required: true },
    
    // Geographic data
    district: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    
    // Media attachments
    images: [{ type: String }],
    
    // Status tracking
    status: {
      type: String,
      enum: [
        'submitted',
        'under_review',
        'assigned',
        'in_progress',
        'resolved',
        'closed',
      ],
      default: 'submitted',
    },
    assignedTo: {
      type: String,
      default: 'Unassigned',
    },
    notes: [NoteSchema],
  },
  { timestamps: true }
);

const Complaint = models.Complaint || model('Complaint', ComplaintSchema);

export default Complaint;
