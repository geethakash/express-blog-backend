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
  async resolve(parent: any, args: any, context: any) {
    if (!context.isAuthenticated() || context.isAdmin()) {
      const user = new User({
        name: args.name,
        username: args.username,
        email: args.email,
        password: args.password,
        avatar: args.avatar,
      });
      return user.save();
    } else {
      throw new Error('You are not authorized to perform this action');
    }
  },
};

export const updateUser = {
  type: userType,
  description: 'Update a existing user',
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
    // console.log(args.id);
    console.log('user: ', context.user);
    const user = await User.findById(args.id);
    if (context.isOwner(args.id) || context.isAdmin()) {
      if (!user) {
        throw new Error('user you are trying to update does not exist');
      }
      if (context.user.id !== user.id) {
        throw new Error('You are not authorized to perform this action');
      }
      return User.findByIdAndUpdate(args.id, args);
    } else {
      throw new Error('You are not authorized to perform this action');
    }
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

export const addFollowerToUser = {
  type: userType,
  description: 'Add a follower to a user',
  args: {
    id: { type: GraphQLString },
    followerId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const user = await User.findById(args.id);

    if (!user) {
      throw new Error('user you are trying to update does not exist');
    }
    // check if user is already following
    if (user.followers.includes(args.followerId)) {
      throw new Error('user already following');
    }
    user.followers.push(args.followerId);
    return user.save();
  },
};

export const removeFollowerFromUser = {
  type: userType,
  description: 'Remove a follower from a user',
  args: {
    id: { type: GraphQLString },
    followerId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const user = await User.findById(args.id);
    if (!user) {
      throw new Error('user you are trying to update does not exist');
    }
    user.followers.pull(args.followerId);
    return user.save();
  },
};
