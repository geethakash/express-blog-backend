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
import {
  createUser,
  updateUser,
  deleteUser,
  addFollowerToUser,
} from './mutations/userMutations';
import {
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addOrRemoveLike,
} from './mutations/blogPostMutations';

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
    addFollowerToUser,

    // blog post mutations
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    // other mutations
    addOrRemoveLike,
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
