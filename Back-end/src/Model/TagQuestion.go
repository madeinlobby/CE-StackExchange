package Model

import "errors"

type TagPost struct {
	TagId      string `json:"tag_id"`
	QuestionId string `json:"question_id"`
}

func initTagQuestionTable() error {
	_, err := db.Exec(`CREATE TABLE If Not Exists tag_questions
		(
			question_id int8 not null,
			tag_id      int8 not null,
			unique (question_id, tag_id),
			foreign key (question_id) references questions (question_id),
			foreign key (tag_id) references tags (tag_id)
		);
	`)
	return err
}

func (question Question) GetQuestionTags() ([]string, error) {
	return nil, nil
}
