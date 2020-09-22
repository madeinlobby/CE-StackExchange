package Model

import (
	"database/sql"
	"errors"
)

type Question struct {
	IsAnswerApproved string `json:"is_answer_approved"`
	Id               string `json:"id"`
	UserId           string `json:"account_id"`
	CommunityId      string `json:"community_id"`
	Title            string `json:"title"`
	Text             string `json:"text"`
	Date             string `json:"date"`
	ViewCount        int    `json:"view_count"`
	Deleted          bool   `json:"deleted"`
}

func initQuestionTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS questions
		(
			question_id        serial PRIMARY KEY,
			user_id            int8 NOT NULL,
			community_id       int8 NOT NULL,
			question_title     text NOT NULL,
			question_body      text NOT NULL,
			date_of_issue      date NOT NULL DEFAULT current_date,
			view_count         int8 NOT NULL DEFAULT 0,
			is_deleted         boolean       DEFAULT False,
			is_answer_approved boolean       DEFAULT False,
			Foreign Key (user_id)
				references accounts (user_id),
			FOREIGN KEY (community_id)
				references communities (community_id)
		);
	`)
	return err
}

func GetQuestionById(questionId string, deleted ...bool) (*Question, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var question = Question{}
	r := db.QueryRow(`SELECT * FROM questions WHERE question_id = $1 AND deleted = $2`, questionId, isDeleted)
	err := r.Scan(&question.Id, &question.UserId, &question.CommunityId, &question.Title,
		&question.Text, &question.Date, &question.ViewCount, &question.Deleted, &question.IsAnswerApproved)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such question")
	case nil:
		return &question, nil
	default:
		return nil, err
	}
}

func NewQuestion(accountId string, communityName string, title string, text string, tagArr []string) (*Question, error) {
	// add new question
	r := db.QueryRow(`
					WITH communityId AS (SELECT community_id FROM communities WHERE community_name = $2)
					INSERT INTO questions (
                     	user_id,
                     	community_id,
                     	question_title,
                       	question_body)
					  values ($1, communityId, $3, $4) returning *;`,
		accountId, communityName, title, text)

	// retrieves the created question and check for errors
	var newQuestion = Question{}
	err := r.Scan(&newQuestion.Id, &newQuestion.UserId, &newQuestion.Title, &newQuestion.Text,
		&newQuestion.Date, &newQuestion.ViewCount, &newQuestion.Deleted, &newQuestion.IsAnswerApproved)

	if err != nil {
		return nil, err
	}

	// insert the question tags
	err = newQuestion.AddTags(tagArr)
	if err != nil {
		return &newQuestion, errors.New("question created but could not insert the tags")
	}

	return &newQuestion, nil
}

func (question *Question) DeleteQuestion() error {
	r := db.QueryRow(`UPDATE questions 
							SET is_deleted = TRUE
							WHERE question_id = $1
							RETURNING is_deleted			
	`, question.Id)
	return r.Scan(&question.Deleted)
}

func (question *Question) AddViewCount(addAmount int) error {
	r := db.QueryRow(`UPDATE questions 
							SET view_count = $2
							WHERE question_id = $1
							RETURNING view_count					
	`, question.Id, question.ViewCount+addAmount)
	return r.Scan(&question.ViewCount)
}

func (user *Account) GetQuestions() ([]Question, error) {
	r, err := db.Query(`SELECT * FROM questions WHERE user_id = $1`, user.Id)
	if err != nil {
		return nil, err
	}

	// scans the r for the rows
	var questions []Question
	for r.Next() {
		var scannedQuestion = Question{}
		err = r.Scan(&scannedQuestion.Id, &scannedQuestion.UserId, &scannedQuestion.CommunityId,
			&scannedQuestion.Title, &scannedQuestion.Text, &scannedQuestion.Date,
			&scannedQuestion.ViewCount, &scannedQuestion.Deleted, &scannedQuestion.IsAnswerApproved)
		if err != nil {
			return nil, errors.New("error fetching the questions")
		}

		questions = append(questions, scannedQuestion)
	}

	return questions, nil
}

func (answer *Answer) GetQuestionOfAnswer() (*Question, error) {
	var question = Question{}
	r := db.QueryRow(`SELECT q.question_id, user_id, community_id, question_title, 
       							question_body, date_of_issue, view_count, is_deleted, is_answer_approved 
							FROM answers a
							INNER JOIN questions q ON a.question_id = q.question_id
							WHERE answer_id = $1`,
		answer.Id)
	err := r.Scan(&question.Id, &question.UserId, &question.CommunityId, &question.Title,
		&question.Text, &question.Date, &question.ViewCount, &question.Deleted, &question.IsAnswerApproved)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such question")
	case nil:
		return &question, nil
	default:
		return nil, err
	}
}
