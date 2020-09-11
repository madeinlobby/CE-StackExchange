package View

import (
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
)

func GetAllCommunities(w http.ResponseWriter, _ *http.Request) {
	communities, err := Model.GetAllCommunities(false)
	if err != nil {
		http.Error(w, "error:"+err.Error(), http.StatusInternalServerError)
		return
	}

	var response []byte
	response, err = yaml.Marshal(&communities)
	if err != nil {
		http.Error(w, "error: could not serialize the result.", http.StatusInternalServerError)
		return
	} else {
		_, _ = w.Write(response)
	}
}

func CreateNewCommunity(w http.ResponseWriter, r *http.Request) {
	// read the body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read the body", http.StatusInternalServerError)
		return
	}

	// extract the parameters
	params := struct {
		communityName string
		description   string
	}{}
	if yaml.Unmarshal(body, &params) != nil {
		http.Error(w, "error: could not read body", http.StatusBadRequest)
		return
	}

	// process and return the result
	var com *Model.Community
	com, err = Model.GetCommunityByName(params.communityName)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if com != nil {
		http.Error(w, "error: Community with given name already exists", http.StatusConflict)
		return
	}

	_, err = Model.NewCommunity(params.communityName, params.description)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
