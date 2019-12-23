import React from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
});

// or you can use `import gql from 'graphql-tag';` instead

const App: React.FC = () => {
    client
    .query({
        query: gql`
            query {
                getTopics{
                    id
                    left
                    right
                    hasVoted
                }
            }
        `
    })
    .then(result => console.log(result));

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
