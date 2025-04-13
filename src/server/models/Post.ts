
import mongoose, { Schema, Document } from 'mongoose';

export type PostType = 'Post' | 'Comment' | 'Reply';

export interface IPost extends Document {
  PostID: string;
  PostType: PostType;
  PostTitle: string;
  PostBody: string;
  PostChildrenIds: string[];
  Likes: number;
  Dislikes: number;
  ParentID?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  PostID: { type: String, required: true, unique: true },
  PostType: { 
    type: String, 
    required: true, 
    enum: ['Post', 'Comment', 'Reply'] 
  },
  PostTitle: { type: String, required: true },
  PostBody: { type: String, required: true },
  PostChildrenIds: [{ type: String, default: [] }],
  Likes: { type: Number, default: 0 },
  Dislikes: { type: Number, default: 0 },
  ParentID: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for faster queries
PostSchema.index({ PostID: 1 });
PostSchema.index({ ParentID: 1 });

export default mongoose.model<IPost>('Post', PostSchema);
