package Model

type Question struct {
	IsAnswerApproved string `json:is_answer_approved`
	Id               string `json:"id"`
	AccountId        string `json:"account_id"`
	CommunityId      string `json:"community_id"`
	Title            string `json:"title"`
	Text             string `json:"text"`
	Date             string `json:"date"`
	ViewCount        int    `json:"view_count"`
	Deleted          bool   `json:"deleted"`
}

func GetAllQuestions(deleted ...bool) ([]Question, error) {
	return nil, nil
}

func GetQuestionById(questionId string, deleted ...bool) (*Question, error) {
	return nil, nil
}

func NewQuestion(accountId string, communityName string, title string, text string, tagArr []string) (*Question, error) {
	return nil, nil
}

func (question *Question) DeleteQuestion() error {
	return nil
}

func (question *Question) AddViewCount(addAmount int) error {
	return nil
}

func (user *Account) GetQuestions() ([]Question, error) {
	return nil, nil
}

func (answer *Answer) GetQuestionOfAnswer() (*Question, error) {
	return nil, nil
}
