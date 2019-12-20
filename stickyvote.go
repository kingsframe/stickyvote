package stickyvote

import (
	"errors"
	"github.com/graph-gophers/graphql-go"
)

var Schema = `
	schema {
		query: Query
	}
	type Query {
		getTopics(): [Topic!]!
		getDemoTopic(): Topic!
	}
	type Topic {
		left: String!
		right: String!
		hasVoted: Choice
	}
	enum Choice {
		LEFT
		RIGHT
	}	
`
type topic struct {
	ID       graphql.ID
	Left     string
	Right    string
	HasVoted *string //TODO check if this is correct
}

var topicData = make(map[graphql.ID]*topic)

func init() {
	CHOICE_LEFT := "LEFT"
	CHOICE_RIGHT := "RIGHT"
	var topics = []*topic{
		{ID: "0", Left: "Bernie", Right: "Trump", HasVoted: &CHOICE_LEFT},
		{ID: "1", Left: "F150", Right: "CyberTruck", HasVoted: &CHOICE_RIGHT},
	}

	for _, d := range topics {
		topicData[d.ID] = d
	}
}

type Resolver struct{}

func (r *Resolver) GetTopics() ([]*topicResolver, error) {
	return []*topicResolver{{data: topicData["0"]}, {data: topicData["1"]}}, nil
	//return nil, errors.New("This is not the droid you are looking for")
}

func (r *Resolver) GetDemoTopic() (*topicResolver, error) {
	if val := topicData["0"]; val != nil {
		return &topicResolver{data: val}, nil
	}
	return nil, errors.New("This is not the droid you are looking for")
}

type topicResolver struct {
	data *topic
}

func (r *topicResolver) ID() graphql.ID {
	return r.data.ID
}

func (r *topicResolver) Left() string {
	return r.data.Left
}
func (r *topicResolver) Right() string {
	return r.data.Right
}
func (r *topicResolver) HasVoted() *string {
	return r.data.HasVoted
}
