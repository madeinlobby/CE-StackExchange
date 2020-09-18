package Model

type Comment struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string
	AnswerId   string
	Text       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
}

func initCommentTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS comments
		(
			comment_id    serial primary key,
			user_id       int8    NOT NULL,
			question_id   int8,
			answer_id     int8,
			comment_body  text    NOT NULL,
			date_of_issue date    not null default current_date,
			is_deleted    boolean not null default false,
			foreign key (user_id) references accounts (user_id),
			foreign key (question_id) references questions (question_id),
			foreign key (answer_id) references answers (answer_id)
		);
	`)
	return err
}

func GetAllComments(deleted ...bool) ([]Comment, error) {
	return nil, nil
}

func GetCommentById(commentId string, deleted ...bool) (*Comment, error) {
	return nil, nil
}

func (question *Question) AddComment(accountId string, text string) (*Comment, error) {
	return nil, nil
}

func (answer *Answer) AddComment(accountId string, text string) (*Comment, error) {
	return nil, nil
}

func (comment *Comment) CommentOnComment(accountId string, childComment string) (*Comment, error) {
	return nil, nil
}

func (comment *Comment) DeleteComment() error {
	return nil
}
