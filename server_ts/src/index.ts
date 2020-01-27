const {ApolloServer, gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
        // launches: (_, __, {dataSources}) =>
        //     dataSources.launchAPI.getAllLaunches(),
        // launch: (_, {id}, {dataSources}) =>
        //     dataSources.launchAPI.getLaunchById({launchId: id}),
        // me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser()
        books: () => {
            return [{
                title: "im a title222",
                author: "im a author"
            }]
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
