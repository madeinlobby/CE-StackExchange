package Model

import (
	"database/sql"
	"errors"
)

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
			question_id   int8 DEFAULT NULL,
			answer_id     int8 DEFAULT NULL,
			is_upvote     boolean Not Null,
			date_of_issue date    not null default current_date,
			is_deleted    boolean not null default false,
			constraint unique (user_id, question_id, answer_id),
			foreign key (user_id) references accounts (user_id),
			foreign key (question_id) references questions (question_id),
			foreign key (answer_id) references answers (answer_id)
		);
	`)
	return err
}

func GetVoteById(voteId string, deleted ...bool) (*Vote, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var vote = Vote{}
	r := db.QueryRow(`SELECT * FROM votes WHERE vote_id = $1 AND deleted = $2`, voteId, isDeleted)
	err := r.Scan(&vote.Id, &vote.AccountId, &vote.QuestionId, &vote.AnswerId, &vote.IsUpvote, &vote.Date, &vote.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such vote")
	case nil:
		return &vote, nil
	default:
		return nil, err
	}
}

func (question *Question) NewVote(accountId string, isUp bool) (*Vote, error) {
	// check if user has already voted
	row := db.QueryRow(`SELECT *
					FROM votes WHERE user_id = $1 AND question_id = $2`,
		accountId, question.Id)
	var prevVote = Vote{}
	err := row.Scan(&prevVote.Id, &prevVote.AccountId, &prevVote.QuestionId,
		&prevVote.AnswerId, &prevVote.IsUpvote, &prevVote.Date, &prevVote.Deleted)

	switch err {
	case sql.ErrNoRows:
		// user did not voted on this question before. no action needed.
		break
	case nil:
		// user already voted.
		if prevVote.IsUpvote == isUp {
			// the votes match then no action to take.
			return nil, nil
		} else {
			// delete the previous vote and add the current one
			err = prevVote.DeleteVote()
			if err != nil {
				return nil, errors.New("error in deleting the previous vote")
			}
		}
	default:
		return nil, err
	}

	// add new vote
	r := db.QueryRow(`INSERT INTO votes (
                     user_id, question_id, is_upvote)
					  values ($1, $2, $3) returning *;`,
		accountId, question.Id, isUp)

	// retrieves the created vote and returns the result
	var newVote = Vote{}
	err = r.Scan(&newVote.Id, &newVote.AccountId, &newVote.QuestionId, &newVote.AnswerId, &newVote.Date, &newVote.Deleted)

	if err != nil {
		return nil, err
	}

	return &newVote, nil
}

func (answer *Answer) NewVote(accountId string, isUp bool) (*Vote, error) {
	// check if user has already voted
	row := db.QueryRow(`SELECT *
					FROM votes WHERE user_id = $1 AND answer_id = $2`,
		accountId, answer.Id)
	var prevVote = Vote{}
	err := row.Scan(&prevVote.Id, &prevVote.AccountId, &prevVote.QuestionId,
		&prevVote.AnswerId, &prevVote.IsUpvote, &prevVote.Date, &prevVote.Deleted)

	switch err {
	case sql.ErrNoRows:
		// user did not voted on this question before. no action needed.
		break
	case nil:
		// user already voted.
		if prevVote.IsUpvote == isUp {
			// the votes match then no action to take.
			return nil, nil
		} else {
			// delete the previous vote and add the current one
			err = prevVote.DeleteVote()
			if err != nil {
				return nil, errors.New("error in deleting the previous vote")
			}
		}
	default:
		return nil, err
	}

	// add new vote
	r := db.QueryRow(`INSERT INTO votes (
                     user_id, answer_id, is_upvote)
					  values ($1, $2, $3) returning *;`,
		accountId, answer.Id, isUp)

	// retrieves the created vote and returns the result
	var newVote = Vote{}
	err = r.Scan(&newVote.Id, &newVote.AccountId, &newVote.QuestionId, &newVote.AnswerId, &newVote.Date, &newVote.Deleted)

	if err != nil {
		return nil, err
	}

	return &newVote, nil
}

func (vote *Vote) DeleteVote() error {
	r := db.QueryRow(`UPDATE votes 
							SET is_deleted = TRUE
							WHERE vote_id = $1
							RETURNING is_deleted			
	`, vote.Id)
	return r.Scan(&vote.Deleted)
}

func (question *Question) GetVotes() (upvotes int, downvotes int, err error) {
	// because of order by, the query returns downvotes and upvotes respectively
	r, err := db.Query(`SELECT COUNT(*) 
						    FROM votes WHERE question_id = $1
						 	GROUP BY is_upvote ORDER BY is_upvote`, question.Id)
	if err != nil {
		return 0, 0, err
	}

	if r.Next(); r.Scan(&downvotes) != nil {
		return 0, 0, errors.New("error in reading downvotes")
	}
	if r.Next(); r.Scan(&upvotes) != nil {
		return 0, 0, errors.New("error in reading upvotes")
	}

	return
}

func (answer *Answer) GetVotes() (upvotes int, downvotes int, err error) {
	// because of order by, the query returns downvotes and upvotes respectively
	r, err := db.Query(`SELECT COUNT(*) 
						    FROM votes WHERE answer_id = $1
						 	GROUP BY is_upvote ORDER BY is_upvote`, answer.Id)
	if err != nil {
		return 0, 0, err
	}

	if r.Next(); r.Scan(&downvotes) != nil {
		return 0, 0, errors.New("error in reading downvotes")
	}
	if r.Next(); r.Scan(&upvotes) != nil {
		return 0, 0, errors.New("error in reading upvotes")
	}

	return
}
