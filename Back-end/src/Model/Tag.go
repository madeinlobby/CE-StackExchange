package Model

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
}

func GetAllTags(deleted ...bool) []Tag {
	return nil
}

func GetTagsByKeyword(keyword string) ([]Tag, error) {
	return nil, nil
}

func GetTagById(tagId string, deleted ...bool) Tag {
	return Tag{}
}

func NewTag(name string) error {
	return nil
}

func DeleteTag(communityId string) {

}
