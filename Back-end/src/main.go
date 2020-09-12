package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Controller"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Resources"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
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

var ServerConfig = Resources.Config{}

func getConfigs() error {
	configFile, fileErr := ioutil.ReadFile("../Config/Back-end.yaml")
	if fileErr != nil {
		return fileErr
	}
	yamlErr := yaml.Unmarshal(configFile, &ServerConfig)
	return yamlErr
}

func main() {
	// get router and add endpoints
	r := mux.NewRouter()

	Controller.HandleServices(r)

	// get server configs
	err := getConfigs()
	if err != nil {
		log.Fatal(err)
	}

	// init database
	err = Model.InitDatabase(&ServerConfig)
	if err != nil {
		panic(err)
	}
	defer Model.CloseDatabase()

	fmt.Println("listening on port: " + strconv.Itoa(ServerConfig.ServerPort))
	panic(http.ListenAndServe(":"+strconv.Itoa(ServerConfig.ServerPort), r))
}
