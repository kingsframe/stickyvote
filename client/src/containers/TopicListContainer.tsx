import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {getTopics} from "./__generated__/getTopics";

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
    const {loading, error, data} = useQuery<getTopics>(GET_TOPICS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    console.log("vote1:", data?.getTopics[0].hasVoted);
    console.log("vote2:", data?.getTopics[1].hasVoted);
    console.log("vote3:", data?.getTopics[2].hasVoted);
    return <div>got data!</div>;
}

//
// export default TopicListContainer
