package Model

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
}

func GetAllTags(deleted ...bool) []Tag {
	return nil
}

func GetTagById(tagId string, deleted ...bool) Tag {
	return Tag{}
}

func NewTag(name string) Tag {
	return Tag{}
}

func DeleteTag(communityId string) {

}
