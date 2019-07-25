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
    }

    type Relation {
        id:ID
        relating: User
        related: User
        status: String
    }

    type Query {
        allUser: [User]
        singleUser(id: ID!): User
    }

    type Mutation {
        join(email: String!, phone: String!, password: String!): User
    }

`;

export default typeDefs;