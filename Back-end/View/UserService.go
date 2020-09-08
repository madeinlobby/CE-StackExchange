package View

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
	"time"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	// extract body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read request's body", http.StatusInternalServerError)
		return
	}

	signupCredentials := signupRequest{}
	err = yaml.Unmarshal(body, &signupCredentials)
	if err != nil {
		http.Error(w, "error: could not parse request's body", http.StatusBadRequest)
		return
	}

	// check credentials
	err = checkSignupCredentials(signupCredentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotAcceptable)
		return
	}

	// create a new account. creating an admin should be by another route. profile image is currently unavailable
	newAcc := Model.NewAccount(signupCredentials.Username,
		signupCredentials.Password,
		false,
		signupCredentials.FirstName+" "+signupCredentials.LastName,
		signupCredentials.Email,
		"")

	if cmp.Equal(newAcc, Model.Account{}) {
		http.Error(w, "error: could not create the account", http.StatusInternalServerError)
		return
	}

	// creating a JWT token and returning the result
	var token string
	token, err = createJWTToken(signupCredentials.Username)
	if err != nil {
		http.Error(w, "error: could not create token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// TODO: add token to redis
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(token))
}

func Login(w http.ResponseWriter, r *http.Request) {
	// extract body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read the body "+err.Error(), http.StatusInternalServerError)
		return
	}

	loginCredentials := loginRequest{}
	err = yaml.Unmarshal(body, &loginCredentials)
	if err != nil {
		http.Error(w, "error: could not parse body "+err.Error(), http.StatusBadRequest)
		return
	}

	// check credentials
	user := Model.GetAccountByUsername(loginCredentials.Username)
	if cmp.Equal(user, Model.Account{}) {
		http.Error(w, "error: invalid username", http.StatusNotFound)
		return
	} else if user.Password != loginCredentials.Password {
		http.Error(w, "error: invalid password", http.StatusForbidden)
		return
	}

	// logs in successfully and returns the result
	var token string
	token, err = createJWTToken(loginCredentials.Username)
	if err != nil {
		http.Error(w, "error: could not create token", http.StatusInternalServerError)
		return
	}

	// TODO: add token to redis
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(token))
}

func Logout(w http.ResponseWriter, r *http.Request) {
	// extracting the token
	token, err := extractJWTToken(r)
	if err != nil {
		http.Error(w, "error: invalid token header", http.StatusUnauthorized)
		return
	}

	// check if the token has expired
	if token.Claims.(jwt.MapClaims)["exp"].(time.Time).Before(time.Now()) {
		http.Error(w, "error: token has expired", http.StatusUnauthorized)
		return
	}

	// invalidate the token and return the result
	//TODO: invalidate the token from redis
	w.WriteHeader(http.StatusNoContent)
}

func AskQuestion(w http.ResponseWriter, r *http.Request) {
	// extract the current account
	currAcc, err := getCurrentAccount(r)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusUnauthorized)
	}

	// extract and translate body
	var body []byte
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	askQuestionInfo := askQuestionRequest{}
	err = yaml.Unmarshal(body, &askQuestionInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// ask the question and return the result
	q := Model.NewQuestion(currAcc.Id, askQuestionInfo.Community,
		askQuestionInfo.Title, askQuestionInfo.Body, askQuestionInfo.TagArr)

	if cmp.Equal(q, Model.Question{}) {
		http.Error(w, "error: could not ask the question", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func AnswerQuestion(w http.ResponseWriter, r *http.Request) {
	// extract the current user
	currAcc, err := getCurrentAccount(r)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// extract and translate body
	var body []byte
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	answerQuestionInfo := answerQuestionRequest{}
	err = yaml.Unmarshal(body, &answerQuestionInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// answer the question and return the result
	a := Model.NewAnswer(currAcc.Id, answerQuestionInfo.QuestionId, answerQuestionInfo.AnswerBody)

	if cmp.Equal(a, Model.Answer{}) {
		http.Error(w, "error: could not answer the question", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func CommentOnQuestion(w http.ResponseWriter, r *http.Request) {
	// extract the current user
	currAcc, err := getCurrentAccount(r)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// extract and translate body
	var body []byte
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	commentInfo := commentOnPostRequest{}
	err = yaml.Unmarshal(body, &commentInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// commenting and returning the result
	comment := Model.CommentOnQuestion(currAcc.Id, commentInfo.QuestionId, commentInfo.Comment)
	if cmp.Equal(comment, Model.Comment{}) {
		http.Error(w, "error: could not submit the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func CommentOnAnswer(w http.ResponseWriter, r *http.Request) {
	// extract the current user
	currAcc, err := getCurrentAccount(r)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// extract and translate body
	var body []byte
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	commentInfo := commentOnPostRequest{}
	err = yaml.Unmarshal(body, &commentInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// commenting and returning the result
	comment := Model.CommentOnAnswer(currAcc.Id, commentInfo.QuestionId, commentInfo.Comment)
	if cmp.Equal(comment, Model.Comment{}) {
		http.Error(w, "error: could not submit the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func CommentOnComment(w http.ResponseWriter, r *http.Request) {

}

func GetUserPosts(w http.ResponseWriter, r *http.Request) {

}

func GetUserProfileInfo(w http.ResponseWriter, r *http.Request) {

}
