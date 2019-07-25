import {
    AuthenticationError,
    ForbiddenError
} from 'apollo-server-express';

import User from '../models/user'
import Relation from '../models/relation'
import * as error from '../modules/error-messages'


const resolvers = {
    Query: {
        allUser: (parent, args, context) => {
            return User.find({});
        },
        singleUser: (parent, args, context) => {
            return User.findById(args.id);
        }
    },
    Mutation: {
        join: async (parent, args) => {
            try {
                const newUser = new User(args);
                newUser.salt = "12345678";
                const user = await User.create(newUser);
                return user
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};


export default resolvers;