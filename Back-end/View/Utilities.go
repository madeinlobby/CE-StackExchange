package View

import (
	"errors"
	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"net/http"
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

type loginRequest struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

type askQuestionRequest struct {
	Community string   `yaml:"community"`
	Title     string   `yaml:"title"`
	Body      string   `yaml:"question body"`
	TagArr    []string `yaml:"tags array"`
}

type answerQuestionRequest struct {
	AnswerBody string `yaml:"answer body"`
	QuestionId string `yaml:"question id"`
}

type commentOnPostRequest struct {
	AnswerId string `yaml:"answer id"`
	QuestionId string `yaml:"question id"`
	Comment string `yaml:"comment body"`
}

type commentOnCommentRequest struct {
	ParentId string `yaml:"parent comment id"`
	ChildBody string `yaml:"new comment body"`
}

type getUserPostsRequest struct {
	Username string `yaml:"username"`
	Opt string `yaml:"option"`
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

// util function to extract data from a token and returning the structure
func extractJWTToken(r *http.Request) (*jwt.Token, error) {
	token, err := jwtmiddleware.FromAuthHeader(r)
	if err != nil {
		return nil, err
	}

	var result *jwt.Token
	result, err = jwt.Parse(token, func(token2 *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return nil, err
	}

	return result, nil
}

// util function to current account from JWT token
func getCurrentAccount(r *http.Request) (Model.Account, error) {
	// get the token
	token, err := extractJWTToken(r)
	if err != nil {
		return Model.Account{}, err
	}

	username := token.Claims.(jwt.MapClaims)["username"].(string)

	var currentAcc Model.Account
	currentAcc = Model.GetAccountByUsername(username, false)
	if cmp.Equal(currentAcc, Model.Account{}) {
		return Model.Account{}, errors.New("no such account")
	}

	return currentAcc, nil
}
