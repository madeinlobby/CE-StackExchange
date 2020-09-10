package Model

type Approval struct {
	Id       string `json:"id"`
	AnswerId string `json:"answer_id"`
	Date     string `json:"date"`
	Deleted  bool   `json:"deleted"`
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
