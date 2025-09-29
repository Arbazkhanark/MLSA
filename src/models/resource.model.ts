import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "course" | "tool" | "documentation" | "tutorial";
  category: "AI/ML" | "Web Development" | "Cloud Computing" | "Data Science" | "Mobile Development" | "DevOps" | "General";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  author: string;
  dateAdded: string;
  featured: boolean;
  rating: number;
  views: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
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
    url: { 
      type: String, 
      required: true,
      trim: true
    },
    type: { 
      type: String, 
      required: true,
      enum: ['article', 'video', 'course', 'tool', 'documentation', 'tutorial'],
      default: 'article'
    },
    category: { 
      type: String, 
      required: true,
      enum: ['AI/ML', 'Web Development', 'Cloud Computing', 'Data Science', 'Mobile Development', 'DevOps', 'General'],
      default: 'General'
    },
    difficulty: { 
      type: String, 
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    tags: [{ 
      type: String,
      trim: true
    }],
    author: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    dateAdded: { 
      type: String, 
      required: true 
    },
    featured: { 
      type: Boolean, 
      default: false 
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    },
    views: { 
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
ResourceSchema.index({ type: 1 });
ResourceSchema.index({ category: 1 });
ResourceSchema.index({ difficulty: 1 });
ResourceSchema.index({ featured: 1 });
ResourceSchema.index({ rating: -1 });
ResourceSchema.index({ views: -1 });
ResourceSchema.index({ createdAt: -1 });

export function getResourceModel() {
  return registerModel<IResource>('Resource', ResourceSchema);
}