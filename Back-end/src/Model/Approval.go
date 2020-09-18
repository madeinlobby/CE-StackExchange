package Model

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

func GetAllApprovals(deleted ...bool) ([]Approval, error) {
	return nil, nil
}

func GetApprovalById(approvalId string, deleted ...bool) (*Approval, error) {
	return nil, nil
}

func NewApproval(answerId string) (*Approval, error) {
	return nil, nil
}

func (app *Approval) DeleteApproval() error {
	return nil
}
