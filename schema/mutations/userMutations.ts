import { GraphQLString, GraphQLBoolean } from 'graphql';
import User from '../../models/User';
import userType from '../types/userType';

export const createUser = {
  type: userType,
  description: 'Create a new user',
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    isActive: { type: GraphQLBoolean },
    avatar: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const user = new User({
      name: args.name,
      username: args.username,
      email: args.email,
      password: args.password,
      isAdmin: args.isAdmin,
      isActive: args.isActive,
      avatar: args.avatar,
    });
    return user.save();
  },
};

export const updateUser = {
  type: userType,
  description: 'Create a new user',
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    isActive: { type: GraphQLBoolean },
    avatar: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, context: any) {
    const user = await User.findById(args.id);
    if (!user) {
      throw new Error('User not found');
    }
    if (context.user.id !== user.id) {
      throw new Error('You are not authorized to update this user');
    }
    return User.findByIdAndUpdate(args.id, args);
  },
};

export const deleteUser = {
  type: userType,
  description: 'Delete a user',
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return User.findByIdAndRemove(args.id);
  },
};
