import React from 'react';
import {render} from 'react-dom';

import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
});
const query = gql`
    query {
        getTopics{
            id
            left
            right
            hasVoted
        }
    }
`;


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app</h2>
            <MagicComponent/>
        </div>
    </ApolloProvider>
);


function MagicComponent() {
    const {loading, error, data} = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return <div>got data!</div>;
}

render(<App/>, document.getElementById('root'));
export default App;
