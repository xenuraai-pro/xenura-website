import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    budget: { type: String, default: '' },
    message: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    source: { type: String, enum: ['popup', 'contact', 'career'], default: 'contact' },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    submittedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Submission = mongoose.model('Submission', submissionSchema);

export function formatSubmission(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone || '',
    company: doc.company || '',
    budget: doc.budget || '',
    message: doc.message,
    resumeUrl: doc.resumeUrl || '',
    source: doc.source || 'contact',
    status: doc.status,
    submittedAt: doc.submittedAt.toISOString(),
  };
}
