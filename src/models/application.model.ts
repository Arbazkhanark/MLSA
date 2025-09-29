import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IApplication extends Document {
  openingId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  year: string;
  gpa: string;
  position: string;
  experience: string;
  skills: string[];
  motivation: string;
  availability: string;
  portfolio: string;
  resume: string;
  status: "pending" | "shortlisted" | "interviewed" | "accepted" | "rejected";
  appliedDate: string;
  notes: string;
  interviewDate?: string;
  interviewScore?: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    openingId: {
      type: Schema.Types.ObjectId,
      ref: 'Opening',
      required: true
    },
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    email: { 
      type: String, 
      required: true,
      trim: true,
      lowercase: true
    },
    phone: { 
      type: String, 
      required: true,
      trim: true
    },
    university: { 
      type: String, 
      required: true,
      trim: true
    },
    major: { 
      type: String, 
      required: true,
      trim: true
    },
    year: { 
      type: String, 
      required: true,
      enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']
    },
    gpa: { 
      type: String, 
      required: true 
    },
    position: { 
      type: String, 
      required: true,
      trim: true
    },
    experience: { 
      type: String, 
      required: true,
      maxlength: 1000
    },
    skills: [{ 
      type: String,
      trim: true
    }],
    motivation: { 
      type: String, 
      required: true,
      maxlength: 1500
    },
    availability: { 
      type: String, 
      required: true 
    },
    portfolio: { 
      type: String, 
      required: false 
    },
    resume: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'shortlisted', 'interviewed', 'accepted', 'rejected'], 
      default: 'pending'
    },
    appliedDate: { 
      type: String, 
      required: true 
    },
    notes: { 
      type: String, 
      default: '' 
    },
    interviewDate: { 
      type: String 
    },
    interviewScore: { 
      type: Number,
      min: 0,
      max: 10
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  { 
    timestamps: true 
  }
);

// Indexes
ApplicationSchema.index({ openingId: 1 });
ApplicationSchema.index({ email: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ appliedDate: -1 });
ApplicationSchema.index({ openingId: 1, email: 1 }, { unique: true }); // Prevent duplicate applications

export function getApplicationModel() {
  return registerModel<IApplication>('Application', ApplicationSchema);
}