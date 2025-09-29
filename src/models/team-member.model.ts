// import { registerModel } from '@/lib/db';
// import mongoose, { Schema, type Document } from 'mongoose';

// export interface ITeamMember extends Document {
//   name: string;
//   role: string;
//   position: string;
//   email: string;
//   bio: string;
//   skills: string[];
//   location: string;
//   joinDate: string;
//   status: "active" | "inactive";
//   avatar: string;
//   social: {
//     linkedin?: string;
//     github?: string;
//     twitter?: string;
//   };
//   createdBy: mongoose.Types.ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const TeamMemberSchema = new Schema<ITeamMember>(
//   {
//     name: { 
//       type: String, 
//       required: true,
//       trim: true,
//       maxlength: 100
//     },
//     role: { 
//       type: String, 
//       required: true,
//       enum: ['President', 'Vice President', 'Technical Lead', 'Community Manager', 'Content Creator', 'Event Coordinator', 'Outreach Coordinator', 'Member'],
//       default: 'Member'
//     },
//     position: { 
//       type: String, 
//       required: true,
//       trim: true,
//       maxlength: 100
//     },
//     email: { 
//       type: String, 
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//     },
//     bio: { 
//       type: String,
//       required: true,
//       maxlength: 500 
//     },
//     skills: [{ 
//       type: String,
//       trim: true
//     }],
//     location: { 
//       type: String,
//       required: true,
//       trim: true
//     },
//     joinDate: { 
//       type: String,
//       required: true
//     },
//     status: { 
//       type: String, 
//       enum: ['active', 'inactive'], 
//       default: 'active'
//     },
//     avatar: { 
//       type: String,
//       default: '/images/default-avatar.png'
//     },
//     social: {
//       linkedin: { type: String, default: null },
//       github: { type: String, default: null },
//       twitter: { type: String, default: null },
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     }
//   },
//   { 
//     timestamps: true 
//   }
// );

// // Indexes
// TeamMemberSchema.index({ email: 1 }, { unique: true });
// TeamMemberSchema.index({ role: 1 });
// TeamMemberSchema.index({ status: 1 });
// TeamMemberSchema.index({ createdAt: -1 });

// // export const TeamMember = registerModel<ITeamMember>('TeamMember', TeamMemberSchema);

// export function getTeamMemberModel() {
//   return registerModel<ITeamMember>('TeamMember', TeamMemberSchema);
// }




















import { registerModel } from '@/lib/db';
import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  position: string;
  email: string;
  bio: string;
  skills: string[];
  location: string;
  joinDate: string;
  status: "active" | "inactive";
  avatar: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    role: { 
      type: String, 
      required: true,
      enum: ['President', 'Vice President', 'Technical Lead', 'Community Manager', 'Content Creator', 'Event Coordinator', 'Outreach Coordinator', 'Member'],
      default: 'Member'
    },
    position: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    email: { 
      type: String, 
      required: true,
      unique: true, // YAHI PE unique likho, schema.index() MAT use karo
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    bio: { 
      type: String,
      required: true,
      maxlength: 500 
    },
    skills: [{ 
      type: String,
      trim: true
    }],
    location: { 
      type: String,
      required: true,
      trim: true
    },
    joinDate: { 
      type: String,
      required: true
    },
    status: { 
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'active'
    },
    avatar: { 
      type: String,
      default: '/images/default-avatar.png'
    },
    social: {
      linkedin: { type: String, default: null },
      github: { type: String, default: null },
      twitter: { type: String, default: null },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false // ✅ REQUIRED HATA DO
    }
  },
  { 
    timestamps: true 
  }
);

// Sirf additional indexes yahan add karo
TeamMemberSchema.index({ role: 1 });
TeamMemberSchema.index({ status: 1 });
TeamMemberSchema.index({ createdAt: -1 });

// Schema.index({ email: 1 }) MAT LIKHO - yeh duplicate create karega

export function getTeamMemberModel() {
  return registerModel<ITeamMember>('TeamMember', TeamMemberSchema);
}