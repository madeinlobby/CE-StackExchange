package Model

type Question struct {
	IsAnswerApproved string `json:is_answer_approved`
	Id               string `json:"id"`
	AccountId        string `json:"account_id"`
	CommunityId      string `json:"community_id"`
	Title            string `json:"title"`
	Text             string `json:"text"`
	Date             string `json:"date"`
	ViewCount        int    `json:"view_count"`
	Deleted          bool   `json:"deleted"`
}

func GetAllQuestions(deleted ...bool) []Question {
	return nil
}

func GetQuestionById(questionId string, deleted ...bool) Question {
	return Question{}
}

func NewQuestion(accountId string, communityName string, title string, text string, tagArr []string) Question {
	return Question{}
}

func DeleteQuestion(questionId string) {

}

func AddViewCount(questionId string, addAmount int) {

}
