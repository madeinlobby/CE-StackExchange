package View

import (
	"encoding/json"
	"github.com/ghemawat/stream"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
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
	err = json.Unmarshal(body, &info)
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
	result, err = json.Marshal(tagNames)
	if err != nil {
		http.Error(w, "error: could not marshal the result", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(result)
}

func CreateNewTag(w http.ResponseWriter, r *http.Request) {
	// extract the current user
	_, err := getCurrentAccount(r)
	//currAcc, err := getCurrentAccount(r) // currAcc is not currently needed
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// extract and translate body
	var body []byte
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	info := createNewTagRequest{}
	err = json.Unmarshal(body, &info)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	//TODO: check currAcc reputation to see if they can create a tag or not.

	// processing and returning the result
	err = Model.NewTag(info.TagName)
	if err != nil {
		http.Error(w, "error: could not create the tag", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
