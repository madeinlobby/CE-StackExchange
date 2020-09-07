package View

import (
	"errors"
	"net/http"
	"strconv"
)

var secretKey = []byte("Xp2s5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdS")

// post service message protocol definition
type answerBasicInfo struct {
	AccountId       string `yaml:"user id"`
	AccountUsername string `yaml:"user username"`
	AnswerBody      string `yaml:"answer body"`
	Downvotes       int    `yaml:"number of downvotes"`
	Upvotes         int    `yaml:"number of upvotes"`
	WasHelpful      bool   `yaml:"was helpful"`
	date            string `yaml:"date of issue"`
}

type questionBasicInfo struct {
	IsAnswerApproved string `yaml:is answer approved`
	AskerId          string `yaml:"asker id"`
	AskerName        string `yaml:"asker name"`
	QuestionId       string `yaml:"question id"`
	QuestionTitle    string `yaml:"question title"`
	QuestionBody     string `yaml:"question body"`
	Downvotes        int    `yaml:"number of downvotes"`
	Upvotes          int    `yaml:"number of upvotes"`
	date             string `yaml:"date of issue"`
}

type answersOfQuestion struct {
	question questionBasicInfo
	answers  []answerBasicInfo
}

// user service message protocol definition

// community service message protocol definition

// util function to read the body of a request
func readBody(r *http.Request) ([]byte, error) {
	size, err := strconv.Atoi(r.Header.Get("size"))
	if err != nil {
		return nil, errors.New("size is not provided in header correctly")
	}

	p := make([]byte, size)
	read, err2 := r.Body.Read(p)

	if read == 0 && err2 != nil {
		return nil, err2
	}

	return p, nil
}
