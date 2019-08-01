import {
    AuthenticationError,
    ForbiddenError
} from 'apollo-server-express';

import User from '../models/user'
import Relation from '../models/relation'
import Chat from '../models/chat'
import * as error from '../modules/error-messages'
import {
    randomGenerator
} from '../modules/common';

const resolvers = {
    Query: {
        allUser: (parent, args, context) => {
            return User.find({});
        },
        singleUser: (parent, args, context) => {
            return User.findById(args.id);
        },
        allRelation: (parent, args, context) => {
            return Relation.find().populate('relating').populate('related');
        },
        oneRelation: (parent, args, context) => {
            return Relation.findById(args.id).populate('relating').populate('related');
        }
    },
    Mutation: {
        login: async (parent, args) => {
            try {
                if (!args.email || !args.password) throw new AuthenticationError(error.signup.invalidEmailPassword);
                const user = await User.findOne({
                    email: args.email
                });
                if (!user) throw new Error(error.login.noUserFound);
                if (!user.verifyPassword(args.password)) throw new Error(error.login.noPasswordMatched);
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    token: user.getJWT()
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        join: async (parent, args) => {
            try {
                if (!args.email || !args.password) throw new AuthenticationError(error.signup.invalidEmailPassword);
                const checkUniqueUser = await User.findOne({
                    email: args.email
                });
                if (checkUniqueUser) throw new AuthenticationError(error.signup.invalidEmail);
                const newUser = new User(args);
                newUser.salt = randomGenerator(10);
                newUser.password = newUser.hashPassword(newUser.password)
                const user = await User.create(newUser);
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    token: user.getJWT()
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        makeRelation: async (parent, args, context) => {
            try {
                if (!context.id) throw new ForbiddenError(error.auth.failed);
                if (!args.related) throw new AuthenticationError(error.relation.noRelated);
                const checkUniqueUserStatus = await Relation.findOne({
                    relating: context.id,
                    related: args.related
                });
                if (checkUniqueUserStatus) {
                    const relationUpdate = await Relation.update({_id: checkUniqueUserStatus.id}, {$set: { status: args.status }})
                    return Relation.findById(checkUniqueUserStatus.id).populate('relating').populate('related');
                }else{
                    const newRelation = new Relation(args);
                    newRelation.relating = context.id
                    const relation = await Relation.create(newRelation);
                    return Relation.findById(relation._id).populate('relating').populate('related');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        createRoom: async (parent, args, context) => {
            try {
                if (!context.id) throw new ForbiddenError(error.auth.failed);
                if (!args.to) throw new AuthenticationError(error.chat.noTo);
                console.log(args)
                const newChat = new Chat({
                    members : [context.id, args.to],
                    messages : []
                });
                const createdChat = await Chat.create(newChat);
                console.log("createdChat._id ===== ", Chat.findById(createdChat._id).populate('members'))
                return Chat.findById(createdChat._id).populate('members');
                //return Chat.findById(createdChat._id).populate('members')
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};


export default resolvers;