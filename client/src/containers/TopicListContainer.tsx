import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_TOPICS = gql`
    query getTopics {
        getTopics{
            id
            left
            right
            hasVoted
        }
    }
`;

export function TopicListContainer() {
    const {loading, error, data} = useQuery(GET_TOPICS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return <div>got data!</div>;
}

//
// export default TopicListContainer
