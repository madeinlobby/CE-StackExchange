package Model

type Community struct {
	Id       string `json:"id" yaml:"-"`
	Name     string `json:"name" yaml:"name"`
	InfoText string `json:"info_text" yaml:"-"`
	Deleted  bool   `json:"deleted" yaml:"-"`
}

func GetAllCommunities(deleted ...bool) []Community {
	return nil
}

func GetCommunityById(communityId string, deleted ...bool) Community {
	return Community{}
}

// TODO: notice me senpai!
func GetCommunityByName(communityName string, deleted ...bool) Community {
	return Community{}
}

func NewCommunity(name string, infoText string) Community {
	return Community{}
}

func DeleteCommunity(communityId string) {

}
