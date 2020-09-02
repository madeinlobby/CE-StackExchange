package Model

type Bookmark struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
}

func GetAllBookmarks(deleted ...bool) []Bookmark {

}

func GetBookmarkById(bookmarkId string, deleted ...bool) Bookmark {

}

func NewBookmark(accountId string, questionId string) Bookmark {

}

func DeleteBookmark(bookmarkId string) {

}
