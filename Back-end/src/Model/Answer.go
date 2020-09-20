package Model

type Answer struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Body       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
	IsApproved bool   `json:"was_helpful"`
}

func initAnswerTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS answers
		(
		answer_id          serial PRIMARY KEY,
		user_id            int8 NOT NULL,
		question_id        int8 NOT NULL,
		answer_body        text NOT NULL,
		date_of_issue      date NOT NULL DEFAULT current_date,	
		is_answer_approved boolean,
		is_deleted         boolean       DEFAULT false,
		FOREIGN KEY (user_id)	REFERENCES accounts (user_id),
		foreign key (question_id)	references questions (question_id)
		);
	`)
	return err
}

func GetAllAnswers() ([]Answer, error) {

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
