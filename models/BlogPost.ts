import mongoose from 'mongoose';
import { UserDocument } from './User';

interface IReply {
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

interface IComment {
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  replies: IReply[];
}

export type BlogPostDocument = mongoose.Document & {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: UserDocument;
  likes: UserDocument[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
};

const BlogPostSchema = new mongoose.Schema<BlogPostDocument>(
  {
    title: {
      type: String,
      maxlength: [80, 'Title cannot be more than 40 characters'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          content: {
            type: String,
            required: true,
          },

          replies: {
            type: [
              {
                user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User',
                  required: true,
                },
                content: {
                  type: String,
                  required: true,
                },
                createdAt: {
                  type: Date,
                  default: Date.now(),
                },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model('BlogPost', BlogPostSchema);
