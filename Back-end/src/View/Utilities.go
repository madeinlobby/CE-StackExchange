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
	QuestionId      string `json:"question id"`
	QuestionTitle   string `json:"question title"`
	AccountId       string `json:"user id"`
	AccountUsername string `json:"user username"`
	AnswerBody      string `json:"answer body"`
	Downvotes       int    `json:"number of downvotes"`
	Upvotes         int    `json:"number of upvotes"`
	WasHelpful      bool   `json:"was helpful"`
	Date            string `json:"date of issue"`
}

type questionBasicInfo struct {
	IsAnswerApproved string   `json:"is answer approved"`
	AskerId          string   `json:"asker id"`
	AskerName        string   `json:"asker name"`
	QuestionId       string   `json:"question id"`
	QuestionTitle    string   `json:"question title"`
	QuestionBody     string   `json:"question body"`
	Downvotes        int      `json:"number of downvotes"`
	Upvotes          int      `json:"number of upvotes"`
	Date             string   `json:"date of issue"`
	Tags             []string `json:"tags array"`
	NumOfAns         int      `json:"number of answers"`
}

type answersOfQuestion struct {
	question *questionBasicInfo
	answers  []answerBasicInfo
}

// user service message protocol definition
type signupRequest struct {
	Username      string `json:"username"`
	Password      string `json:"password"`
	Email         string `json:"email"`
	StudentNumber string `json:"student number"`
	FirstName     string `json:"first name"`
	LastName      string `json:"last name"`
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type askQuestionRequest struct {
	Community string   `json:"community"`
	Title     string   `json:"title"`
	Body      string   `json:"question body"`
	TagArr    []string `json:"tags array"`
}

type answerQuestionRequest struct {
	AnswerBody string `json:"answer body"`
	QuestionId string `json:"question id"`
}

type commentOnPostRequest struct {
	AnswerId   string `json:"answer id"`
	QuestionId string `json:"question id"`
	Comment    string `json:"comment body"`
}

type commentOnCommentRequest struct {
	ParentId  string `json:"parent comment id"`
	ChildBody string `json:"new comment body"`
}

type getUserProfileInfoRequest struct {
	Username string `json:"username"`
}

type userProfileInfo struct {
	IsForOwn      bool   `json:"is for own"`
	Username      string `json:"username"`
	FirstName     string `json:"first name"`
	LastName      string `json:"last name"`
	Email         string `json:"email"`
	StudentNumber string `json:"student number"`
	AboutMe       string `json:"about me"`
}

// tag service message protocol definition
type createNewTagRequest struct {
	TagName string `json:"tag name"`
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
