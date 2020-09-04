package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"net/http"
)

type answerBasicInfo struct {
	AccountId       string `yaml:"user id"`
	AccountUsername string `yaml:"user username"`
	AnswerBody      string `yaml:"answer body"`
	Downvotes       int    `yaml:"number of downvotes"`
	Upvotes         int    `yaml:"number of upvotes"`
	WasHelpful      bool   `yaml:"was helpful"`
	date            string `yaml:"date of issue"`
}

type questionBasicInfo struct {
	AskerId       string `yaml:"asker id"`
	AskerName     string `yaml:"asker name"`
	QuestionId    string `yaml:"question id"`
	QuestionTitle string `yaml:"question title"`
	QuestionBody  string `yaml:"question body"`
	Downvotes     int    `yaml:"number of downvotes"`
	Upvotes       int    `yaml:"number of upvotes"`
	date          string `yaml:"date of issue"`
}

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
	result, err := yaml.Marshal(questionBasicInfo{
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
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q := Model.GetQuestionById(id)
	if cmp.Equal(q, Model.Question{}) {
		w.WriteHeader(404)
		w.Write([]byte("error: no such question exists."))
		return
	}

	// processing and returning the result
	qAnswers := make([]answerBasicInfo, 5)
	for _, answer := range Model.GetQuestionAnswers(q.Id) {
		qAnswers = append(qAnswers, getAnswerInfo(answer))
	}

	result, err := yaml.Marshal(qAnswers)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error: failed at marshaling the result."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(result)
}

func GetAnswerInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the answer exists or not
	id := mux.Vars(r)["id"]
	a := Model.GetAnswerById(id)
	if cmp.Equal(a, Model.Question{}) {
		w.WriteHeader(404)
		w.Write([]byte("error: no such answer exists."))
		return
	}

	// processing and returning the result
	response, err := yaml.Marshal(getAnswerInfo(a))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error: failed at marshaling the result."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func getAnswerInfo(answer Model.Answer) answerBasicInfo {
	upvotes, downvotes := Model.GetPostVotes(answer.Id)
	return answerBasicInfo{
		AccountId:       answer.AccountId,
		AccountUsername: Model.GetAccountById(answer.AccountId).Username,
		AnswerBody:      answer.Text,
		Downvotes:       downvotes,
		Upvotes:         upvotes,
		WasHelpful:      answer.WasHelpful,
		date:            answer.Date,
	}
}

func GetPostCluster(w http.ResponseWriter, r *http.Request) {

}
