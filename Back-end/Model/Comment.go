package Model

type Comment struct {
	Id        string `json:"id"`
	AccountId string `json:"account_id"`
	QAId      string `json:"qa_id"`
	Text      string `json:"text"`
	Date      string `json:"date"`
	Deleted   bool   `json:"deleted"`
}

func GetAllComments(deleted ...bool) []Comment {
	return nil
}

func GetCommentById(commentId string, deleted ...bool) Comment {
	return Comment{}
}

func CommentOnQuestion(accountId string, questionId string, text string) Comment {
	return Comment{}
}

func CommentOnAnswer(accountId string, answerId string, text string) Comment {
	return Comment{}
}

func CommentOnComment(accountId string, parentId string, childComment string) error {
	return nil
}

func DeleteComment(commentId string) {

}
