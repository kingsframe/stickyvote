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
		#getTopics(): [Topic!]!
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

func (r *Resolver) GetDemoTopic() (*topicResolver, error) {
	if d := topicData["0"]; d != nil {
		return &topicResolver{d: d}, nil
	}
	return nil, errors.New("This is not the droid you are looking for")
}

type topicResolver struct {
	d *topic
}

func (r *topicResolver) ID() graphql.ID {
	return r.d.ID
}

func (r *topicResolver) Left() string {
	return r.d.Left
}
func (r *topicResolver) Right() string {
	return r.d.Right
}
func (r *topicResolver) HasVoted() *string {
	return r.d.HasVoted
}
