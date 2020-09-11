package Model

type Comment struct {
	Id        string `json:"id"`
	AccountId string `json:"account_id"`
	QAId      string `json:"qa_id"`
	Text      string `json:"text"`
	Date      string `json:"date"`
	Deleted   bool   `json:"deleted"`
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
