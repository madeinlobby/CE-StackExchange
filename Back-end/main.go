package main

import (
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Controller"
	"net/http"
)

//the blueprint by which methods can be added to the Config/API.yaml
type Service struct {
	ServiceDescription string
	Url                string
	HttpMethod         string
	Header             []string
	Parameters         []string
	response           string
}

func main() {
	r := mux.NewRouter()

	Controller.HandleServices(r)

	panic(http.ListenAndServe(":8000", r))
}
