import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    isActive: { type: GraphQLBoolean },
    followers: { type: GraphQLList(GraphQLID) },
    avatar: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export default UserType;
