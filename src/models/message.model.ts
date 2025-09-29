import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: "general" | "technical" | "event" | "partnership" | "feedback" | "complaint";
  priority: "low" | "medium" | "high" | "urgent";
  status: "unread" | "read" | "replied" | "resolved" | "archived";
  receivedDate: string;
  repliedDate?: string;
  reply?: string;
  repliedBy?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
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
      trim: true
    },
    subject: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    message: { 
      type: String, 
      required: true,
      maxlength: 2000 
    },
    category: { 
      type: String, 
      required: true,
      enum: ['general', 'technical', 'event', 'partnership', 'feedback', 'complaint'],
      default: 'general'
    },
    priority: { 
      type: String, 
      required: true,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: { 
      type: String, 
      enum: ['unread', 'read', 'replied', 'resolved', 'archived'], 
      default: 'unread'
    },
    receivedDate: { 
      type: String, 
      required: true 
    },
    repliedDate: { 
      type: String 
    },
    reply: { 
      type: String,
      maxlength: 2000
    },
    repliedBy: { 
      type: String,
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
MessageSchema.index({ status: 1 });
MessageSchema.index({ category: 1 });
MessageSchema.index({ priority: 1 });
MessageSchema.index({ email: 1 });
MessageSchema.index({ receivedDate: -1 });
MessageSchema.index({ createdAt: -1 });

export function getMessageModel() {
  return registerModel<IMessage>('Message', MessageSchema);
}