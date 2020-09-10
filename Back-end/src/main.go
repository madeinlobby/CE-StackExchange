package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Controller"
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

// this is used to config back-end server which is at Config/Back-end.yaml
type config struct {
	ServerPort   int    `yaml:"server port"`
	JwtSecretKey string `yaml:"jwt secret key"`
}

var ServerConfig config = config{}

func getConfigs() error {
	configFile, fileErr := ioutil.ReadFile("../Config/Back-end.yaml")
	if fileErr != nil {
		return fileErr
	}
	yamlErr := yaml.Unmarshal(configFile, &ServerConfig)
	return yamlErr
}

func main() {
	r := mux.NewRouter()

	Controller.HandleServices(r)

	err := getConfigs()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("listening on port: " + strconv.Itoa(ServerConfig.ServerPort))
	panic(http.ListenAndServe(":"+strconv.Itoa(ServerConfig.ServerPort), r))
}
