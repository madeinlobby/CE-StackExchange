package Model

import (
	"database/sql"
	"errors"
)

type Answer struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string `json:"question_id"`
	Body       string `json:"text"`
	Date       string `json:"date"`
	Deleted    bool   `json:"deleted"`
	IsApproved bool   `json:"was_helpful"`
}

func initAnswerTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS answers
		(
		answer_id          serial PRIMARY KEY,
		user_id            int8 NOT NULL,
		question_id        int8 NOT NULL,
		answer_body        text NOT NULL,
		date_of_issue      date NOT NULL DEFAULT current_date,	
		is_answer_approved boolean NOT NULL Default false,
		is_deleted         boolean       DEFAULT false,
		FOREIGN KEY (user_id)	REFERENCES accounts (user_id),
		foreign key (question_id)	references questions (question_id)
		);
	`)
	return err
}

func GetAnswerById(answerId string, deleted ...bool) (*Answer, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var answer = Answer{}
	r := db.QueryRow(`SELECT * FROM answers WHERE answer_id = $1 AND deleted = $2`, answerId, isDeleted)
	err := r.Scan(&answer.Id, &answer.AccountId, &answer.Body, &answer.Date,
		&answer.IsApproved, &answer.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such answer")
	case nil:
		return &answer, nil
	default:
		return nil, err
	}
}

func NewAnswer(accountId string, questionId string, text string) (*Answer, error) {
	// add new account
	r := db.QueryRow(`INSERT INTO answers (
                     user_id,
                     question_id,
                     answer_body
                     )
					  values ($1, $2, $3) returning *;`,
		accountId, questionId, text)

	// retrieves the created account and returns the result
	var newAnswer = Answer{}
	err := r.Scan(&newAnswer.Id, &newAnswer.AccountId, &newAnswer.QuestionId, &newAnswer.Body,
		&newAnswer.Date, &newAnswer.IsApproved, &newAnswer.Deleted)

	if err != nil {
		return nil, err
	}

	return &newAnswer, nil
}

func (answer *Answer) DeleteAnswer() error {
	r := db.QueryRow(`UPDATE answers 
							SET answers.is_deleted = TRUE
							WHERE answer_id = $1
							RETURNING answers.is_deleted					
	`, answer.Id)
	return r.Scan(&answer.Deleted)
}

func (question *Question) GetAnswers() ([]Answer, error) {
	r, err := db.Query(`SELECT * FROM answers WHERE question_id = $1`, question.Id)
	if err != nil {
		return nil, err
	}

	// scans the r for the rows
	var answers []Answer
	for r.Next() {
		var scannedAnswer = Answer{}
		err = r.Scan(&scannedAnswer.Id, &scannedAnswer.AccountId, &scannedAnswer.QuestionId,
			&scannedAnswer.Body, &scannedAnswer.Date, &scannedAnswer.IsApproved, &scannedAnswer.Deleted)
		if err != nil {
			return nil, errors.New("error fetching the answers")
		}

		answers = append(answers, scannedAnswer)
	}

	return answers, nil
}

func (user *Account) GetAnswers() ([]Answer, error) {
	r, err := db.Query(`SELECT * FROM answers WHERE user_id = $1`, user.Id)
	if err != nil {
		return nil, err
	}

	// scans the r for the rows
	var answers []Answer
	for r.Next() {
		var scannedAnswer = Answer{}
		err = r.Scan(&scannedAnswer.Id, &scannedAnswer.AccountId, &scannedAnswer.QuestionId,
			&scannedAnswer.Body, &scannedAnswer.Date, &scannedAnswer.IsApproved, &scannedAnswer.Deleted)
		if err != nil {
			return nil, errors.New("error fetching the answers")
		}

		answers = append(answers, scannedAnswer)
	}

	return answers, nil
}
