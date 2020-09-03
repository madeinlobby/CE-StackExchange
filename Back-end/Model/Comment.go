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

}

func GetCommentById(commentId string, deleted ...bool) Comment {

}

func NewComment(accountId string, qaId string, text string) Comment {

}

func DeleteComment(commentId string) {

}
