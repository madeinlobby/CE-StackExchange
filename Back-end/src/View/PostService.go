package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
	"gopkg.in/yaml.v2"
	"net/http"
)

func GetQuestionInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q := Model.GetQuestionById(id)
	if cmp.Equal(q, Model.Question{}) {
		w.WriteHeader(404)
		_, _ = w.Write([]byte("error: no such question exists."))
		return
	}

	// returning the result
	info := getQuestionInfo(q)
	result, err := yaml.Marshal(&info)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(result)
}

func GetAnswersOfQuestion(w http.ResponseWriter, r *http.Request) {
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q := Model.GetQuestionById(id)
	if cmp.Equal(q, Model.Question{}) {
		w.WriteHeader(404)
		_, _ = w.Write([]byte("error: no such question exists."))
		return
	}

	// processing and returning the result
	qAnswers := answersOfQuestion{}
	qAnswers.question = getQuestionInfo(q)
	for _, answer := range Model.GetQuestionAnswers(q.Id) {
		qAnswers.answers = append(qAnswers.answers, getAnswerInfo(answer))
	}

	result, err := yaml.Marshal(&qAnswers)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(result)
}

func GetAnswerInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the answer exists or not
	id := mux.Vars(r)["id"]
	a := Model.GetAnswerById(id)
	if cmp.Equal(a, Model.Question{}) {
		http.Error(w, "error: no such answer exists.", http.StatusNotFound)
		return
	}

	// processing and returning the result
	info := getAnswerInfo(a)
	response, err := yaml.Marshal(&info)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(response)
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

func getQuestionInfo(q Model.Question) questionBasicInfo {
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
		Model.GetQuestionTags(q.Id),
	}
}

func GetPostCluster(w http.ResponseWriter, r *http.Request) {

}