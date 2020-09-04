package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"net/http"
)

func GetQuestionInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q := Model.GetQuestionById(id)
	if cmp.Equal(q, Model.Question{}) {
		w.WriteHeader(404)
		w.Write([]byte("error: no such question exists."))
		return
	}

	// returning the result
	upvotes, downvotes := Model.GetPostVotes(q.Id)
	result, err := yaml.Marshal(struct {
		AskerId       string `yaml:"asker id"`
		AskerName     string `yaml:"asker name"`
		QuestionId    string `yaml:"question id"`
		QuestionTitle string `yaml:"question title"`
		QuestionBody  string `yaml:"question body"`
		Downvotes     int    `yaml:"number of downvotes"`
		Upvotes       int    `yaml:"number of upvotes"`
		date          string `yaml:"date of issue"`
	}{
		q.AccountId,
		Model.GetAccountById(q.AccountId).Username,
		q.Id,
		q.Title,
		q.Text,
		downvotes,
		upvotes,
		q.Date,
	})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error: failed at marshaling the result: " + err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(result)
}

func GetAnswersOfQuestion(w http.ResponseWriter, r *http.Request) {

}

func GetAnswerInfo(w http.ResponseWriter, r *http.Request) {

}

func GetPostCluster(w http.ResponseWriter, r *http.Request) {

}
