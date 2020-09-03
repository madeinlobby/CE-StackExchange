package Model

type Answer struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Text       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
}

func GetAllAnswers(deleted ...bool) []Answer {

}

func GetAnswerById(answerId string, deleted ...bool) Answer {

}

func NewAnswer(accountId string, questionId string, text string) Answer {

}

func DeleteAnswer(answerId string) {

}

func GetAnswerAccount(answerId string) Account {
	return GetAccountById(GetAnswerById(answerId).QuestionId)
}

func GetAnswerQuestion(answerId string) Question {
	return GetQuestionById(GetAnswerById(answerId).QuestionId)
}
