package View

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"time"
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
type signupRequest struct {
	Username      string `yaml:"username"`
	Password      string `yaml:"password"`
	Email         string `yaml:"email"`
	StudentNumber string `yaml:"student number"`
	FirstName     string `yaml:"first name"`
	LastName      string `yaml:"last name"`
}

// checks sign up credentials and returns error if one occurred
func checkSignupCredentials(credentials signupRequest) error {
	if !cmp.Equal(Model.GetAccountByUsername(credentials.Username), Model.Account{}) {
		return errors.New("error: username is already taken")
	}

	if !cmp.Equal(Model.GetAccountByEmail(credentials.Email), Model.Account{}) {
		return errors.New("error: email is already used")
	}

	if !cmp.Equal(Model.GetAccountByStudentNumber(credentials.StudentNumber), Model.Account{}) {
		return errors.New("error: student number is already used")
	}

	return nil
}

// util function to create and return a JWT token when a user logs in or signs up
func createJWTToken(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	// token is valid for an hour
	claims["exp"] = time.Now().Add(time.Hour)
	return token.SignedString(secretKey)
}
