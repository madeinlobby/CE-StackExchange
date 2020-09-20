package Model

type Bookmark struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
}

func initBookmarkTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS bookmarks
		(
			bookmark_id   serial primary key,
			user_id       int8    not null,
			question_id   int8    not null,
			date_of_issue date    not null default current_date,
			is_deleted    boolean not null default false,
			foreign key (user_id) references accounts (user_id),
			foreign key (question_id) references questions (question_id)
		);
	`)
	return err
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
