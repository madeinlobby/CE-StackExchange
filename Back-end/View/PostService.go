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
	result, err := yaml.Marshal(getQuestionInfo(q))
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
	qAnswers := answersOfQuestion{}
	qAnswers.question = getQuestionInfo(q)
	for _, answer := range Model.GetQuestionAnswers(q.Id) {
		qAnswers.answers = append(qAnswers.answers, getAnswerInfo(answer))
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

func getQuestionInfo(q Model.Question) questionBasicInfo{
	upvotes, downvotes := Model.GetPostVotes(q.Id)
	return questionBasicInfo{
		q.IsAnswerApproved,
		q.AccountId,
		Model.GetAccountById(q.AccountId).Username,
		q.Id,
		q.Title,
		q.Text,
		downvotes,
		upvotes,
		q.Date,
	}
}

func GetPostCluster(w http.ResponseWriter, r *http.Request) {

}
