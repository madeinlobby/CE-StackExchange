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

func (question *Question) AddTags(tagArr []string) error {
	// if no tag to add then every thing is fine
	if tagArr == nil || len(tagArr) == 0 {
		return nil
	}

	// form initial query
	query := "INSERT INTO tag_questions (question_id, tag_id) VALUES"

	// add values to the query
	for i, item := range tagArr {
		if i != len(tagArr)-1 {
			query += "(" + question.Id + "," + item + "),"
		} else {
			query += "(" + question.Id + "," + item + ");"
		}
	}

	// had to take a dummy variable cuz my stupid idea would not let me submit the initial query with syntax error!
	dummyQuery := query
	_, err := db.Exec(dummyQuery)
	return err
}

func (question *Question) GetTags() ([]string, error) {
	r, err := db.Query(`SELECT tag_id FROM tag_questions WHERE question_id = $1`, question.Id)
	if err != nil {
		return nil, err
	}

	// scan the tags
	var qTags []string
	for r.Next() {
		var tag string
		err = r.Scan(&tag)
		if err != nil {
			return nil, errors.New("error fetching the answers")
		}

		qTags = append(qTags, tag)
	}

	return qTags, nil
}
