import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IOpening extends Document {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  type: "full-time" | "part-time" | "internship" | "volunteer";
  category: "technical" | "non-technical" | "leadership";
  location: string;
  deadline: string;
  status: "active" | "inactive" | "closed";
  maxApplications: number;
  currentApplications: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OpeningSchema = new Schema<IOpening>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    description: { 
      type: String, 
      required: true,
      maxlength: 2000 
    },
    requirements: [{ 
      type: String,
      trim: true
    }],
    responsibilities: [{ 
      type: String,
      trim: true
    }],
    qualifications: [{ 
      type: String,
      trim: true
    }],
    skills: [{ 
      type: String,
      trim: true
    }],
    type: { 
      type: String, 
      required: true,
      enum: ['full-time', 'part-time', 'internship', 'volunteer'],
      default: 'part-time'
    },
    category: { 
      type: String, 
      required: true,
      enum: ['technical', 'non-technical', 'leadership'],
      default: 'technical'
    },
    location: { 
      type: String, 
      required: true,
      trim: true
    },
    deadline: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['active', 'inactive', 'closed'], 
      default: 'active'
    },
    maxApplications: { 
      type: Number, 
      required: true,
      min: 1
    },
    currentApplications: { 
      type: Number, 
      default: 0,
      min: 0
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
OpeningSchema.index({ status: 1 });
OpeningSchema.index({ type: 1 });
OpeningSchema.index({ category: 1 });
OpeningSchema.index({ deadline: 1 });
OpeningSchema.index({ createdAt: -1 });

export function getOpeningModel() {
  return registerModel<IOpening>('Opening', OpeningSchema);
}