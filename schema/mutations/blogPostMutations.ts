import { GraphQLString, GraphQLList } from 'graphql';
import BlogPost from '../../models/BlogPost';
import BlogPostType from '../types/blogPostType';

export const addBlogPost = {
  type: BlogPostType,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    coverImage: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
  },
  resolve(parent: any, args: any, context: any) {
    if (context.isAdmin()) {
      const blogPost = new BlogPost({
        title: args.title,
        content: args.content,
        coverImage: args.coverImage,
        author: args.author,
        tags: args.tags,
      });
      return blogPost.save();
    } else {
      throw new Error('You are not authorized to perform this action');
    }
  },
};

export const updateBlogPost = {
  type: BlogPostType,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    coverImage: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
  },
  resolve(parent: any, args: any, context: any) {
    if (context.isOwner(args.id) || context.isAdmin()) {
      return BlogPost.findByIdAndUpdate(args.id, args);
    } else {
      throw new Error('You are not authorized to perform this action');
    }
  },
};

export const deleteBlogPost = {
  type: BlogPostType,
  args: {
    id: { type: GraphQLString },
  },
  resolve(parent: any, args: any, context: any) {
    if (context.isOwner(args.id) || context.isAdmin()) {
      return BlogPost.findByIdAndRemove(args.id);
    } else {
      throw new Error('You are not authorized to perform this action');
    }
  },
};

export const addComment = {
  type: BlogPostType,
  args: {
    id: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
  // :TODO: is $push similar to array.push()?
  resolve(parent: any, args: any, context: any) {
    return BlogPost.findByIdAndUpdate(args.id, {
      $push: { comments: args.comment },
    });
  },
};
export const addOrRemoveLike = {
  type: BlogPostType,
  args: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    // if (BlogPost) {
    //   return;
    // }
    return BlogPost.findByIdAndUpdate(args.id, {
      $push: { likes: args.userId },
    });
  },
};
export const addReply = {
  type: BlogPostType,
  args: {
    id: { type: GraphQLString },
    commentId: { type: GraphQLString },
    reply: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return BlogPost.findByIdAndUpdate(args.id, {
      $push: {
        comments: {
          [args.commentId]: {
            $push: { replies: args.reply, userId: args.userId },
          },
        },
      },
    });
  },
};
