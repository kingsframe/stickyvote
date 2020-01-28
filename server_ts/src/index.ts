import {Choice, Topic} from "./generated/graphql";

const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        getTopics: [Topic!]!
        getDemoTopic: Topic!
    }
    type Mutation {
        vote(topic: ID!, choice: Choice!): ID
    }
    type Topic {
        id: ID!
        left: String!
        right: String!
        hasVoted: Choice
    }
    enum Choice {
        LEFT
        RIGHT
    }
`;

const db = [
    {id: "0", left: "Bernie", right: "Trump", hasVoted: Choice.Left},
    {id: "1", left: "F150", right: "CyberTruck", hasVoted: Choice.Right},
    {id: "2", left: "Einstein", right: "Euler", hasVoted: Choice.Left},
];

const resolvers = {
    Query: {
        getDemoTopic: (): Topic => {
            return {id: "0", left: "Bernie", right: "Trump", hasVoted: Choice.Left}
        },
        getTopics: (): Array<Topic> => {
            return db
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
