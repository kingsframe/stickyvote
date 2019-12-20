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
		droid(id: ID!): Droid!
		#getTopics(): [Topic!]!
		getDemoTopic(): Topic!
	}
	# An autonomous mechanical character in the Star Wars universe
	type Droid {
		# The ID of the droid
		id: ID!
		# What others call this droid
		name: String!
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

type droid struct {
	ID   graphql.ID
	Name string
}

type topic struct {
	ID       graphql.ID
	Left     string
	Right    string
	HasVoted *string //TODO check if this is correct
}

var droidData = make(map[graphql.ID]*droid)
var topicData = make(map[graphql.ID]*topic)

func init() {
	CHOICE_LEFT := "LEFT"
	CHOICE_RIGHT := "RIGHT"
	var topics = []*topic{
		{ID: "0", Left: "Bernie", Right: "Trump", HasVoted: &CHOICE_LEFT},
		{ID: "1", Left: "F150", Right: "CyberTruck", HasVoted: &CHOICE_RIGHT},
	}
	var droids = []*droid{
		{ID: "2000", Name: "C-3PO"},
		{ID: "2001", Name: "R2-D2"},
	}
	
	for _, d := range droids {
		droidData[d.ID] = d
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

func (r *Resolver) Droid(args struct{ ID graphql.ID }) (*droidResolver, error) {
	if d := droidData[args.ID]; d != nil {
		return &droidResolver{d: d}, nil
	}
	return nil, errors.New("This is not the droid you are looking for")
}

type droidResolver struct {
	d *droid
}

func (r *droidResolver) ID() graphql.ID {
	return r.d.ID
}

func (r *droidResolver) Name() string {
	return r.d.Name
}
