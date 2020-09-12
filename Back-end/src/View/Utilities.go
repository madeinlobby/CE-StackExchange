package View

import (
	"errors"
	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
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
	IsAnswerApproved string   `yaml:"is answer approved"`
	AskerId          string   `yaml:"asker id"`
	AskerName        string   `yaml:"asker name"`
	QuestionId       string   `yaml:"question id"`
	QuestionTitle    string   `yaml:"question title"`
	QuestionBody     string   `yaml:"question body"`
	Downvotes        int      `yaml:"number of downvotes"`
	Upvotes          int      `yaml:"number of upvotes"`
	Date             string   `yaml:"date of issue"`
	Tags             []string `yaml:"tags array"`
	NumOfAns         int      `yaml:"number of answers"`
}

type answersOfQuestion struct {
	question *questionBasicInfo
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
	AnswerId   string `yaml:"answer id"`
	QuestionId string `yaml:"question id"`
	Comment    string `yaml:"comment body"`
}

type commentOnCommentRequest struct {
	ParentId  string `yaml:"parent comment id"`
	ChildBody string `yaml:"new comment body"`
}

type getUserPostsRequest struct {
	Username string `yaml:"username"`
	Opt      string `yaml:"option"`
}

type getUserProfileInfoRequest struct {
	Username string `yaml:"username"`
}

type userProfileInfo struct {
	IsForOwn      bool   `yaml:"is for own"`
	Username      string `yaml:"username"`
	FirstName     string `yaml:"first name"`
	LastName      string `yaml:"last name"`
	Email         string `yaml:"email"`
	StudentNumber string `yaml:"student number"`
	AboutMe       string `yaml:"about me"`
}

// tag service message protocol definition
type getListOfTagsRequest struct {
	Keyword string `yaml:"keyword"`
}

type createNewTagRequest struct {
	TagName string `yaml:"tag name"`
}

// checks sign up credentials and returns error if one occurred
func checkSignupCredentials(credentials signupRequest) error {
	user, err := Model.GetAccountByUsername(credentials.Username)
	if err != nil {
		return err
	}
	if user != nil {
		return errors.New("error: username is already taken")
	}

	user, err = Model.GetAccountByEmail(credentials.Username)
	if err != nil {
		return err
	}
	if user != nil {
		return errors.New("error: email is already taken")
	}

	user, err = Model.GetAccountByStudentNumber(credentials.Username)
	if err != nil {
		return err
	}
	if user != nil {
		return errors.New("error: student number is already taken")
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
func getCurrentAccount(r *http.Request) (*Model.Account, error) {
	// get the token
	token, err := extractJWTToken(r)
	if err != nil {
		return nil, err
	}

	username := token.Claims.(jwt.MapClaims)["username"].(string)

	var currentAcc *Model.Account
	currentAcc, err = Model.GetAccountByUsername(username, false)
	if currentAcc == nil {
		return nil, errors.New("no such account")
	}
	if err != nil {
		return nil, err
	}

	return currentAcc, nil
}
