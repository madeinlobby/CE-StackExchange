package Model

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
	Date    string
}

func initTagTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS tags
		(
			tag_id        serial primary key,
			tag_name      varchar(100) NOT NULL UNIQUE,
			date_of_issue date         not null default current_date,
			is_deleted    boolean      not null default false
		);
	`)
	return err
}

func GetAllTags(deleted ...bool) ([]Tag, error) {
	return nil, nil
}

func GetTagsByKeyword(keyword string) ([]Tag, error) {
	return nil, nil
}

func GetTagById(tagId string, deleted ...bool) (*Tag, error) {
	return nil, nil
}

func NewTag(name string) error {
	return nil
}

func (tag Tag) DeleteTag() error {
	return nil
}
