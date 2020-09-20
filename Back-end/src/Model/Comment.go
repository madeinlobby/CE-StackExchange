package Model

import (
	"database/sql"
	"errors"
)

type Comment struct {
	Id              string `json:"id"`
	AccountId       string `json:"account_id"`
	QuestionId      string `json:"question_id"`
	AnswerId        string `json:"answer_id"`
	ParentCommentId string `json:"parent_comment_id"`
	Text            string `json:"text"`
	Date            string `json:"date"`
	Deleted         bool   `json:"deleted"`
}

func initCommentTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS comments
		(
			comment_id    serial primary key,
			user_id       int8    NOT NULL,
			question_id   int8 default null,
			answer_id     int8 default null,
			parent_comment_id int8 DEFAULT null,
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

func GetCommentById(commentId string, deleted ...bool) (*Comment, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var comment = Comment{}
	r := db.QueryRow(`SELECT * FROM comments WHERE comment_id = $1 AND deleted = $2`, commentId, isDeleted)
	err := r.Scan(&comment.Id, &comment.AccountId, &comment.QuestionId, &comment.Text,
		&comment.Date, &comment.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such comment")
	case nil:
		return &comment, nil
	default:
		return nil, err
	}
}

func (question *Question) AddComment(accountId string, text string) (*Comment, error) {
	// add new comment
	r := db.QueryRow(`INSERT INTO comments (
                     user_id,
                     question_id,
                     comment_body)
					  values ($1, $2, $3) returning *;`,
		accountId, question.Id, text)

	// retrieves the created comment and returns the result
	var newComment = Comment{}
	err := r.Scan(&newComment.Id, &newComment.AccountId, &newComment.QuestionId, &newComment.AnswerId,
		&newComment.Text, &newComment.Date, &newComment.Deleted)

	if err != nil {
		return nil, err
	}

	return &newComment, nil
}

func (answer *Answer) AddComment(accountId string, text string) (*Comment, error) {
	// add new comment
	r := db.QueryRow(`INSERT INTO comments (
                     user_id,
                     answer_id,
                     comment_body)
					  values ($1, $2, $3) returning *;`,
		accountId, answer.Id, text)

	// retrieves the created comment and returns the result
	var newComment = Comment{}
	err := r.Scan(&newComment.Id, &newComment.AccountId, &newComment.QuestionId, &newComment.AnswerId,
		&newComment.Text, &newComment.Date, &newComment.Deleted)

	if err != nil {
		return nil, err
	}

	return &newComment, nil
}

func (comment *Comment) CommentOnComment(accountId string, childComment string) (*Comment, error) {
	// add new comment
	r := db.QueryRow(`INSERT INTO comments (
                     user_id,
                     parent_comment_id,
                     comment_body)
					  values ($1, $2, $3) returning *;`,
		accountId, comment.Id, childComment)

	// retrieves the created comment and returns the result
	var newComment = Comment{}
	err := r.Scan(&newComment.Id, &newComment.AccountId, &newComment.QuestionId, &newComment.AnswerId,
		&newComment.Text, &newComment.Date, &newComment.Deleted)

	if err != nil {
		return nil, err
	}

	return &newComment, nil
}

func (comment *Comment) DeleteComment() error {
	r := db.QueryRow(`UPDATE comments 
							SET is_deleted = TRUE
							WHERE comment_id = $1
							RETURNING is_deleted			
	`, comment.Id)
	return r.Scan(&comment.Deleted)
}
