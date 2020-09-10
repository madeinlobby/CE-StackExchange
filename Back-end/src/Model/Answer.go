package Model

type Answer struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Text       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`

	//TODO: notice me senpai!
	WasHelpful bool `json:"was_helpful"`
}

func GetAllAnswers(deleted ...bool) []Answer {
	return nil
}

func GetAnswerById(answerId string, deleted ...bool) Answer {
	return Answer{}
}

func NewAnswer(accountId string, questionId string, text string) Answer {
	return Answer{}
}

func DeleteAnswer(answerId string) {

}

func GetAnswerAccount(answerId string) Account {
	return GetAccountById(GetAnswerById(answerId).QuestionId)
}

//TODO: notice me senpai!
func GetQuestionAnswers(questionId string) []Answer {
	return nil
}

//TODO: notice me senpai!
func GetAccountAnswers(accountId string) ([]Answer, error) {
	return nil, nil
}
