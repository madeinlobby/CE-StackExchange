package Model

type Community struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	InfoText string `json:"info_text"`
	Deleted  bool   `json:"deleted"`
}

func GetAllCommunities(deleted ...bool) []Community {

}

func GetCommunityById(communityId string, deleted ...bool) Community {

}

func NewCommunity(name string, infoText string) Community {

}

func DeleteCommunity(communityId string) {

}
