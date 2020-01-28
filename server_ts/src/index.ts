import {
    Choice,
    MutationResolvers,
    MutationVoteArgs,
    QueryResolvers,
    Resolvers,
    Topic,
} from "./generated/graphql";

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

const db: Record<string, Topic> = {
    "0": {id: "0", left: "Bernie", right: "Trump", hasVoted: Choice.Left},
    "1": {id: "1", left: "F150", right: "CyberTruck", hasVoted: Choice.Right},
    "2": {id: "2", left: "Einstein", right: "Euler", hasVoted: Choice.Left},
};

const queryResolvers: QueryResolvers = {
    getDemoTopic: (): Topic => {
        return {id: "0", left: "Bernie", right: "Trump", hasVoted: Choice.Left};
    },
    getTopics: (): Array<Topic> => {
        return Object.values(db);
    }
};


const mutationResolvers: MutationResolvers = {
    vote: (parent, args: MutationVoteArgs) => {
        const {topic, choice} = args;
        if (topic in db) {
            db[topic].hasVoted = choice;
            return db[topic].id;
        }
        return null;
    }
};

const resolvers: Resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
