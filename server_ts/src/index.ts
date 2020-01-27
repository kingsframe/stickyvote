import {Choice, Topic} from "./generated/graphql";

const {ApolloServer, gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
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

const resolvers = {
    Query: {
        // launches: (_, __, {dataSources}) =>
        //     dataSources.launchAPI.getAllLaunches(),
        // launch: (_, {id}, {dataSources}) =>
        //     dataSources.launchAPI.getLaunchById({launchId: id}),
        // me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser()
        getDemoTopic: (): Topic => {
            return {id: "0", left: "Bernie", right: "Trump", hasVoted: Choice.Left}
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
