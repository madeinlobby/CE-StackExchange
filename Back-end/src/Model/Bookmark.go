package Model

type Bookmark struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
}

func GetAllBookmarks(deleted ...bool) ([]Bookmark, error) {
	return nil, nil
}

func GetBookmarkById(bookmarkId string, deleted ...bool) (*Bookmark, error) {
	return nil, nil
}

func NewBookmark(accountId string, questionId string) (*Bookmark, error) {
	return nil, nil
}

func (bm *Bookmark) DeleteBookmark() error {
	return nil
}
