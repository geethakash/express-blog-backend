import { GraphQLString, GraphQLList } from 'graphql';
import BlogPost from '../../models/BlogPost';

export const addBlogPost = {
  type: GraphQLString,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    coverImage: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
  },
  resolve(parent: any, args: any) {
    const blogPost = new BlogPost({
      title: args.title,
      content: args.content,
      coverImage: args.coverImage,
      author: args.author,
      tags: args.tags,
    });
    return blogPost.save();
  },
};
