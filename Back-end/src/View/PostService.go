package View

import (
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
	"gopkg.in/yaml.v2"
	"net/http"
)

func GetQuestionInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q, err := Model.GetQuestionById(id)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusNotFound)
		return
	}

	// returning the result
	var info *questionBasicInfo
	var result []byte
	info, err = getQuestionInfo(q)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result", http.StatusInternalServerError)
		return
	}

	result, err = yaml.Marshal(&info)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(result)
}

func GetAnswersOfQuestion(w http.ResponseWriter, r *http.Request) {
	// checking if the question exists or not
	id := mux.Vars(r)["id"]
	q, err := Model.GetQuestionById(id)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if q == nil {
		http.Error(w, "error: no such question exists", http.StatusNotFound)
		return
	}

	// processing and returning the result
	var qAnswers = &answersOfQuestion{}
	var ans []Model.Answer
	qAnswers.question, err = getQuestionInfo(q)
	ans, err = q.GetQuestionAnswers()
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	for _, answer := range ans {
		var ansInf *answerBasicInfo
		ansInf, err = getAnswerInfo(&answer)
		if err != nil {
			http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		qAnswers.answers = append(qAnswers.answers, *ansInf)
	}

	result, err := yaml.Marshal(&qAnswers)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result.", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(result)
}

func GetAnswerInfo(w http.ResponseWriter, r *http.Request) {
	// checking if the answer exists or not
	id := mux.Vars(r)["id"]
	a, err := Model.GetAnswerById(id)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if a == nil {
		http.Error(w, "error: no such answer exists.", http.StatusNotFound)
		return
	}

	// processing and returning the result
	var info *answerBasicInfo
	var response []byte
	info, err = getAnswerInfo(a)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	response, err = yaml.Marshal(info)
	if err != nil {
		http.Error(w, "error: failed at marshaling the result.", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(response)
}

func getAnswerInfo(answer *Model.Answer) (*answerBasicInfo, error) {
	var user *Model.Account
	var upvotes, downvotes int
	var err error
	var q *Model.Question

	// get the necessary info
	upvotes, downvotes, err = answer.GetVotes()
	user, err = Model.GetAccountById(answer.AccountId)
	if err != nil {
		return nil, err
	}

	q, err = answer.GetQuestionOfAnswer()
	if err != nil {
		return nil, err
	}

	return &answerBasicInfo{
		QuestionId:      q.Id,
		QuestionTitle:   q.Title,
		AccountId:       answer.AccountId,
		AccountUsername: user.Username,
		AnswerBody:      answer.Text,
		Downvotes:       downvotes,
		Upvotes:         upvotes,
		WasHelpful:      answer.WasHelpful,
		date:            answer.Date,
	}, nil
}

func getQuestionInfo(q *Model.Question) (*questionBasicInfo, error) {
	var user *Model.Account
	var tags []string
	var upvotes, downvotes int
	var ans []Model.Answer
	var err error

	// getting the necessary info
	tags, err = q.GetQuestionTags()
	user, err = Model.GetAccountById(q.AccountId)
	upvotes, downvotes, err = q.GetVotes()
	if err != nil {
		return nil, err
	}

	ans, err = q.GetQuestionAnswers()
	if err != nil {
		return nil, err
	}

	return &questionBasicInfo{
		IsAnswerApproved: q.IsAnswerApproved,
		AskerId:          q.AccountId,
		AskerName:        user.Username,
		QuestionId:       q.Id,
		QuestionTitle:    q.Title,
		QuestionBody:     q.Text,
		Downvotes:        downvotes,
		Upvotes:          upvotes,
		Date:             q.Date,
		Tags:             tags,
		NumOfAns:         len(ans),
	}, nil
}

func GetPostCluster(w http.ResponseWriter, r *http.Request) {

}
