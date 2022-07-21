import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
} from 'graphql';

// local imports
import UserType from './types/userType';
import BlogPostType from './types/blogPostType';
import User from '../models/User';
import BlogPost from '../models/BlogPost';
import { createUser, updateUser, deleteUser } from './mutations/userMutations';
import { addBlogPost } from './mutations/blogPostMutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    blogPosts: {
      type: new GraphQLList(BlogPostType),
      resolve(parent, args) {
        return BlogPost.find({});
      },
    },
    blogPost: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return BlogPost.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // user mutations
    createUser,
    updateUser,
    deleteUser,

    // blog post mutations
    addBlogPost,
    updateBlogPost: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        coverImage: { type: GraphQLString },
        author: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return BlogPost.findByIdAndUpdate(args.id, args);
      },
    },
    deleteBlogPost: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return BlogPost.findByIdAndRemove(args.id);
      },
    },

    // other mutations
    addComment: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
        comment: { type: GraphQLString },
      },
      // :TODO: is $push similar to array.push()?
      resolve(parent, args) {
        return BlogPost.findByIdAndUpdate(args.id, {
          $push: { comments: args.comment },
        });
      },
    },
    addLike: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return BlogPost.findByIdAndUpdate(args.id, {
          $push: { likes: args.userId },
        });
      },
    },
    addReply: {
      type: BlogPostType,
      args: {
        id: { type: GraphQLString },
        commentId: { type: GraphQLString },
        reply: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parent, args) {
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
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// addUser: {
//   type: UserType,
//   args: {
//     name: { type: GraphQLString },
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     isAdmin: { type: GraphQLBoolean },
//     isActive: { type: GraphQLBoolean },
//     avatar: { type: GraphQLString },
//   },
//   resolve(parent, args) {
//     const user = new User({
//       name: args.name,
//       username: args.username,
//       email: args.email,
//       password: args.password,
//       isAdmin: args.isAdmin,
//       isActive: args.isActive,
//       avatar: args.avatar,
//     });
//     return user.save();
//   },
// },
// updateUser: {
//   type: UserType,
//   args: {
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     isAdmin: { type: GraphQLBoolean },
//     isActive: { type: GraphQLBoolean },
//     avatar: { type: GraphQLString },
//   },
//   resolve(parent, args, context) {
//     console.log('context user id', context.user);
//     return User.findByIdAndUpdate(args.id, args);
//   },
// },
// deleteUser: {
//   type: UserType,
//   args: {
//     id: { type: GraphQLString },
//   },
//   resolve(parent, args) {
//     return User.findByIdAndRemove(args.id);
//   },
// },
