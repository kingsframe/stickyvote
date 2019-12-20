package stickyvote

import	"github.com/graph-gophers/graphql-go"

type topic struct {
	ID       graphql.ID
	Left     string
	Right    string
	HasVoted *string //TODO check if this is correct
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
