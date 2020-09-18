package Model

type Question struct {
	IsAnswerApproved string `json:is_answer_approved`
	Id               string `json:"id"`
	UserId           string `json:"account_id"`
	CommunityId      string `json:"community_id"`
	Title            string `json:"title"`
	Text             string `json:"text"`
	Date             string `json:"date"`
	ViewCount        int    `json:"view_count"`
	Deleted          bool   `json:"deleted"`
}

func initQuestionTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS questions
		(
			question_id        serial PRIMARY KEY,
			user_id            int8 NOT NULL,
			community_id       int8 NOT NULL,
			question_title     text NOT NULL,
			question_body      text NOT NULL,
			date_of_issue      date NOT NULL DEFAULT current_date,
			view_count         int8 NOT NULL DEFAULT 0,
			is_deleted         boolean       DEFAULT False,
			is_answer_approved boolean       DEFAULT False,
			Foreign Key (user_id)
				references accounts (user_id),
			FOREIGN KEY (community_id)
				references communities (community_id)
		);
	`)
	return err
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
