package View

import (
	"github.com/ghemawat/stream"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
	"strconv"
)

func GetListOfTags(w http.ResponseWriter, r *http.Request) {
	// extract and translate body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	info := getListOfTagsRequest{}
	err = yaml.Unmarshal(body, &info)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// processing and returning the result
	var tags []Model.Tag
	tags, err = Model.GetTagsByKeyword(info.Keyword)
	if err != nil {
		http.Error(w, "error: could not retrieve tags", http.StatusInternalServerError)
		return
	}

	var tagNames []string
	tagNames, err = stream.Contents(
		stream.Numbers(1, len(tags)),
		stream.Map(func(num string) string {
			ind, _ := strconv.Atoi(num)
			return tags[ind].Name
		}),
	)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var result []byte
	result, err = yaml.Marshal(tagNames)
	if err != nil {
		http.Error(w, "error: could not marshal the result", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(result)
}

func CreateNewTag(w http.ResponseWriter, r *http.Request) {

}
