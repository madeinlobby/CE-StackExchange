package Model

type TagPost struct {
	TagId      string `json:"tag_id"`
	QuestionId string `json:"question_id"`
}

func (question Question) GetQuestionTags() ([]string, error) {
	return nil, nil
}
