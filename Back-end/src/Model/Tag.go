package Model

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
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
