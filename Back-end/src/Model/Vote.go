package Model

type Vote struct {
	Id         string `json:"id"`
	AccountId  string `json:"account_id"`
	QuestionId string
	AnswerId   string
	Date       string
	IsUpvote   bool `json:"is_up"`
	Deleted    bool `json:"deleted"`
}

func initVoteTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS votes
		(
			vote_id       serial primary key,
			user_id       int8    not null,
			question_id   int8,
			answer_id     int8,
			is_upvote     boolean Not Null,
			date_of_issue date    not null default current_date,
			is_deleted    boolean not null default false,
			foreign key (user_id) references accounts (user_id),
			foreign key (question_id) references questions (question_id),
			foreign key (answer_id) references answers (answer_id)
		);
	`)
	return err
}

func GetAllVotes(deleted ...bool) ([]Vote, error) {
	return nil, nil
}

func GetVoteById(voteId string, deleted ...bool) (*Vote, error) {
	return nil, nil
}

func NewVote(accountId string, qaId string, isUp bool) error {
	return nil
}

func (vote *Vote) DeleteVote() error {
	return nil
}

func (question *Question) GetVotes() (upvotes int, downvotes int, err error) {
	return 0, 0, nil
}

func (answer *Answer) GetVotes() (upvotes int, downvotes int, err error) {
	return 0, 0, nil
}
