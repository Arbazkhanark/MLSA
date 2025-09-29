import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IMoment extends Document {
  title: string;
  description: string;
  date: string;
  location: string;
  category: "workshop" | "hackathon" | "meetup" | "celebration" | "achievement" | "community";
  image: string;
  participants: string[];
  likes: number;
  featured: boolean;
  tags: string[];
  addedBy: string;
  addedDate: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MomentSchema = new Schema<IMoment>(
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
      maxlength: 1000 
    },
    date: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true,
      trim: true
    },
    category: { 
      type: String, 
      required: true,
      enum: ['workshop', 'hackathon', 'meetup', 'celebration', 'achievement', 'community'],
      default: 'community'
    },
    image: { 
      type: String,
      default: '/images/default-moment.jpg'
    },
    participants: [{ 
      type: String,
      trim: true
    }],
    likes: { 
      type: Number, 
      default: 0,
      min: 0
    },
    featured: { 
      type: Boolean, 
      default: false 
    },
    tags: [{ 
      type: String,
      trim: true
    }],
    addedBy: { 
      type: String, 
      required: true,
      trim: true
    },
    addedDate: { 
      type: String, 
      required: true 
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
MomentSchema.index({ category: 1 });
MomentSchema.index({ featured: 1 });
MomentSchema.index({ date: -1 });
MomentSchema.index({ likes: -1 });
MomentSchema.index({ createdAt: -1 });

export function getMomentModel() {
  return registerModel<IMoment>('Moment', MomentSchema);
}