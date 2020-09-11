package Model

type Answer struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Text       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
	WasHelpful bool   `json:"was_helpful"`
}

func GetAllAnswers(deleted ...bool) ([]Answer, error) {
	return nil, nil
}

func GetAnswerById(answerId string, deleted ...bool) (*Answer, error) {
	return nil, nil
}

func NewAnswer(accountId string, questionId string, text string) (*Answer, error) {
	return nil, nil
}

func (answer *Answer) DeleteAnswer() error {
	return nil
}

func (question *Question) GetQuestionAnswers() ([]Answer, error) {
	return nil, nil
}

func (user *Account) GetAnswers() ([]Answer, error) {
	return nil, nil
}
