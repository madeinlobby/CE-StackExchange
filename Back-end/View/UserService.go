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

//func decode() {
//
//}
//
//func encode()

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

}

func AnswerQuestion(w http.ResponseWriter, r *http.Request) {

}

func CommentOnPost(w http.ResponseWriter, r *http.Request) {

}

func CommentOnComment(w http.ResponseWriter, r *http.Request) {

}

func GetUserPosts(w http.ResponseWriter, r *http.Request) {

}

func GetUserProfileInfo(w http.ResponseWriter, r *http.Request) {

}
