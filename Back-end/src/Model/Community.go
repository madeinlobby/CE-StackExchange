package Model

type Community struct {
	Id       string `json:"id" yaml:"-"`
	Name     string `json:"name" yaml:"name"`
	InfoText string `json:"info_text" yaml:"-"`
	Deleted  bool   `json:"deleted" yaml:"-"`
}

func GetAllCommunities(deleted ...bool) ([]Community, error) {
	return nil, nil
}

func GetCommunityById(communityId string, deleted ...bool) (*Community, error) {
	return nil, nil
}

func GetCommunityByName(communityName string, deleted ...bool) (*Community, error) {
	return nil, nil
}

func NewCommunity(name string, infoText string) (*Community, error) {
	return nil, nil
}

func (Community *Community) DeleteCommunity() error {
	return nil
}
