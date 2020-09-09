package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
)

func GetAllCommunities(w http.ResponseWriter, _ *http.Request) {
	communities := Model.GetAllCommunities(false)
	response, err := yaml.Marshal(&communities)
	if err != nil {
		http.Error(w, "error: could not serialize the result.", http.StatusInternalServerError)
		return
	} else {
		w.WriteHeader(http.StatusOK)
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
	if cmp.Equal(Model.GetCommunityByName(params.communityName), Model.Community{}) {
		http.Error(w, "error: Community with given name already exists", http.StatusConflict)
		return
	}

	Model.NewCommunity(params.communityName, params.description)
	w.WriteHeader(http.StatusNoContent)
}
