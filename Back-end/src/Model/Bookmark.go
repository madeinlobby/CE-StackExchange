package Model

import (
	"database/sql"
	"errors"
)

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

func GetBookmarkById(bookmarkId string, deleted ...bool) (*Bookmark, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var bookmark = Bookmark{}
	r := db.QueryRow(`SELECT * FROM bookmarks WHERE bookmark_id = $1 AND deleted = $2`, bookmarkId, isDeleted)
	err := r.Scan(&bookmark.Id, &bookmark.AccountId, &bookmark.Date, &bookmark.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such approval")
	case nil:
		return &bookmark, nil
	default:
		return nil, err
	}
}

func NewBookmark(accountId string, questionId string) (*Bookmark, error) {
	// add new bookmark
	r := db.QueryRow(`INSERT INTO bookmarks (user_id, question_id)
					  values ($1, $2) returning *;`, accountId, questionId)

	// retrieves the created account and returns the result
	var newBookmark = Bookmark{}
	err := r.Scan(&newBookmark.Id, &newBookmark.AccountId, &newBookmark.Date, &newBookmark.Deleted)

	if err != nil {
		return nil, err
	}

	return &newBookmark, nil
}

func (bm *Bookmark) DeleteBookmark() error {
	r := db.QueryRow(`UPDATE bookmarks 
							SET is_deleted = TRUE
							WHERE bookmark_id = $1
							RETURNING is_deleted					
	`, bm.Id)
	return r.Scan(&bm.Deleted)
}
