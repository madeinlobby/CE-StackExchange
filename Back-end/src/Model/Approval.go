package Model

import (
	"database/sql"
	"errors"
)

type Approval struct {
	Id       string `json:"id"`
	AnswerId string `json:"answer_id"`
	Date     string `json:"date"`
	Deleted  bool   `json:"deleted"`
}

func initApprovalTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS approvals
		(
			approval_id   serial PRIMARY KEY,
			answer_id     int8    NOT NULL,
			date_of_issue date    NOT NULL DEFAULT current_date,
			is_deleted    boolean NOT NULL DEFAULT False,
			FOREIGN KEY (answer_id)
				references answers (answer_id)
		);
	`)
	return err
}

func GetApprovalById(approvalId string, deleted ...bool) (*Approval, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var approval = Approval{}
	r := db.QueryRow(`SELECT * FROM approvals WHERE approval_id = $1 AND deleted = $2`, approvalId, isDeleted)
	err := r.Scan(&approval.Id, &approval.AnswerId, &approval.Date, &approval.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such approval")
	case nil:
		return &approval, nil
	default:
		return nil, err
	}
}

func NewApproval(answerId string) (*Approval, error) {
	// add new approval
	r := db.QueryRow(`INSERT INTO approvals (answer_id)
					  values ($1) returning *;`, answerId)

	// retrieves the created approval and returns the result
	var newApproval = Approval{}
	err := r.Scan(&newApproval.Id, &newApproval.AnswerId, &newApproval.Date, &newApproval.Deleted)

	if err != nil {
		return nil, err
	}

	return &newApproval, nil
}

func (app *Approval) DeleteApproval() error {
	r := db.QueryRow(`UPDATE approvals 
							SET approvals.is_deleted = TRUE
							WHERE approval_id = $1
							RETURNING approvals.is_deleted					
	`, app.Id)
	return r.Scan(&app.Deleted)
}
