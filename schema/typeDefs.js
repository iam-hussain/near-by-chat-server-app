import {
    gql
} from 'apollo-server-express';

const typeDefs = gql `

    type Auth {
        id: ID  
        user_id: String
        token: String
    }
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        password: String
        salt: String
        updatedAt: String
        createdAt: String
    }

    type Relation {
        id:ID
        relating: User
        related: User
        status: String
        updatedAt: String
        createdAt: String
    }

    type Query {
        allUser: [User]
        singleUser(id: ID!): User
        allRelation: [Relation]
        oneRelation(id: ID!): Relation
    }

    type Mutation {
        join(email: String!, phone: String!, password: String!): User
        makeRelation(relating: String!, related: String!, status: String!): Relation
    }

`;

export default typeDefs;