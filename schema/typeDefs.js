import {
    gql
} from 'apollo-server-express';

const typeDefs = gql `

    type Auth {
        id: ID  
        firstName: String
        lastName: String
        email: String
        phone: String
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

    type Messages {
        author:[User]
        body:String
        attachment:String
    }

    type Room {
        id:ID
        members:[User]
        messages:[Messages]
    }

    type Query {
        allUser: [User]
        singleUser(id: ID!): User
        allRelation: [Relation]
        oneRelation(id: ID!): Relation
    }

    type Mutation {
        login(email: String!, password:String!): Auth
        join(email: String!, phone: String!, password: String!): Auth
        makeRelation(related: ID!, status: String!): Relation
        createRoom(to: ID!): Room
        sendMessage(room: ID!, body: String!, attachment:String!)
    }

`;

export default typeDefs;