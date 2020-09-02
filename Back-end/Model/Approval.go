package Model

type Approval struct {
	Id       string `json:"id"`
	AnswerId string `json:"answer_id"`
	Date     string `json:"date"`
	Deleted  bool   `json:"deleted"`
}

func GetAllApprovals(deleted ...bool) []Approval {

}

func GetApprovalById(approvalId string, deleted ...bool) Approval {

}

func NewApproval(answerId string) Approval {

}

func DeleteApproval(approvalId string) {

}
