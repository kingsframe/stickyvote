import React from 'react';
import {render} from 'react-dom';

import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {TopicListContainer} from "./containers/TopicListContainer";

const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
});

const App = () => (
    <ApolloProvider client={client}>
        <TopicListContainer/>
    </ApolloProvider>
);

render(<App/>, document.getElementById('root'));
export default App;
