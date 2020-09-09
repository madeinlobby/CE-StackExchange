package Model

type TagPost struct {
	TagId      string `json:"tag_id"`
	QuestionId string `json:"question_id"`
}

func GetQuestionTags(questionId string) []string {
	return nil
}
