package Model

type Community struct {
	Id       string `json:"id" yaml:"-"`
	Name     string `json:"name" yaml:"name"`
	InfoText string `json:"info_text" yaml:"-"`
	Deleted  bool   `json:"deleted" yaml:"-"`
	Date     string
}

func initCommunityTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS communities
		(
			community_id   serial PRIMARY KEY,
			community_name varchar(100) NOT NULL UNIQUE,
			description    text,
			is_deleted     boolean      NOT NULL DEFAULT False,
			date_of_issue  date         NOT NULL DEFAULT current_date
		);
	`)
	return err
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
