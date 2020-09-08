package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
	"strconv"
)

func GetAllCommunities(w http.ResponseWriter, r *http.Request) {
	communities := Model.GetAllCommunities(false)
	response, err := yaml.Marshal(&communities)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error: could not serialize the result."))
	} else {
		w.WriteHeader(http.StatusOK)
		w.Write(response)
	}
}

func CreateNewCommunity(w http.ResponseWriter, r *http.Request) {
	// read the body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		if _, ok := err.(*strconv.NumError); ok {
			w.WriteHeader(411)
			w.Write([]byte("error: " + err.Error()))
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("error: could not read the body"))
		}
		return
	}

	// extract the parameters
	params := struct {
		communityName string
		description   string
	}{}
	if yaml.Unmarshal(body, &params) != nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("error: body format is not yaml."))
		return
	}

	// process and return the result
	if cmp.Equal(Model.GetCommunityByName(params.communityName), Model.Community{}) {
		w.WriteHeader(http.StatusConflict)
		w.Write([]byte("error: Community with given name already exists"))
		return
	}

	Model.NewCommunity(params.communityName, params.description)
	w.WriteHeader(http.StatusNoContent)
}
