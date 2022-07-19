import {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import UserType from './userType';
import User from '../../models/User';

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    coverImage: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.author);
      },
    },
    likes: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // :TODO: explain what is $in means
        return User.find({ _id: { $in: parent.likes } });
      },
    },
    comments: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Comment',
          fields: {
            user: {
              type: UserType,
              resolve(parent, args) {
                return User.findById(parent.user.toString());
              },
            },
            content: { type: GraphQLString },
            replies: {
              type: new GraphQLObjectType({
                name: 'Reply',
                fields: {
                  user: {
                    type: UserType,
                    resolve(parent, args) {
                      return User.findById(parent.user.toString());
                    },
                  },
                  content: { type: GraphQLString },
                  createdAt: { type: GraphQLString },
                },
              }),
            },
          },
        })
      ),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export default BlogPostType;
