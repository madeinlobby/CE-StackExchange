package View

import (
	"github.com/google/go-cmp/cmp"
	"github.com/madeinlobby/CE-StackExchange/Back-end/Model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/http"
)

//func encode() {
//	token, _ := jwtmiddleware.FromAuthHeader(r)
//	fmt.Println("this is invalid??: " + token)
//	result, err := jwt.Parse(token, func(token2 *jwt.Token) (interface{}, error) {
//		return secretKey, nil
//	})
//	if err != nil {
//		fmt.Println(err)
//	} else {
//		fmt.Println(result)
//	}
//}
//
//func decode() {

//}

func Signup(w http.ResponseWriter, r *http.Request) {
	// extract body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read request's body", http.StatusInternalServerError)
		return
	}

	var signupCredentials signupRequest
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

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(token))
}

func Login(w http.ResponseWriter, r *http.Request) {

}

func Logout(w http.ResponseWriter, r *http.Request) {

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
