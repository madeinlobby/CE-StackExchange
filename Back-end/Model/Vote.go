package Model

type Vote struct {
	Id        string `json:"id"`
	AccountId string `json:"account_id"`
	QAId      string `json:"qa_id"`
	IsUp      bool   `json:"is_up"`
	Deleted   bool   `json:"deleted"`
}

func GetAllVotes(deleted ...bool) []Vote {

}

func GetVoteById(voteId string, deleted ...bool) Vote {

}

func NewVote(accountId string, qaId string, isUp bool) {

}

func DeleteVote(voteId string) {

}
