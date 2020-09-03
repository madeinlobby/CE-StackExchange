package Model

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
}

func GetAllTags(deleted ...bool) []Tag {

}

func GetTagById(tagId string, deleted ...bool) Tag {

}

func NewTag(name string) Tag {

}

func DeleteTag(communityId string) {

}
