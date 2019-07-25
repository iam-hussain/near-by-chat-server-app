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
        },
        allRelation: (parent, args, context) => {
            console.log(Relation.find().populate('User'), " ===================== ")
            return Relation.find().populate('User');
        },
        oneRelation: (parent, args, context) => {
            var newVar = Relation.findById(args.id).populate('User');
            console.log(JSON.stringify(newVar), " ===================== ")
            return Relation.findById(args.id).populate('User');
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
        },
        makeRelation: async (parent, args) => {
            try {   
                const newRelation = new Relation(args);
                const relation = await Relation.create(newRelation);
                return relation
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};


export default resolvers;