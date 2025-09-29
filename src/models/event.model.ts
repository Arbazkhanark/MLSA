import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "workshop" | "webinar" | "hackathon" | "meetup" | "conference";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  maxAttendees: number;
  currentAttendees: number;
  registrationUrl: string;
  image: string;
  tags: string[];
  organizer: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
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
    time: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true,
      trim: true
    },
    type: { 
      type: String, 
      required: true,
      enum: ['workshop', 'webinar', 'hackathon', 'meetup', 'conference'],
      default: 'workshop'
    },
    status: { 
      type: String, 
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], 
      default: 'upcoming'
    },
    maxAttendees: { 
      type: Number, 
      required: true,
      min: 1
    },
    currentAttendees: { 
      type: Number, 
      default: 0,
      min: 0
    },
    registrationUrl: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String,
      default: '/images/default-event.jpg'
    },
    tags: [{ 
      type: String,
      trim: true
    }],
    organizer: { 
      type: String, 
      required: true,
      trim: true
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
EventSchema.index({ date: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ type: 1 });
EventSchema.index({ createdAt: -1 });

export function getEventModel() {
  return registerModel<IEvent>('Event', EventSchema);
}