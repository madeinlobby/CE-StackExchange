package View

import (
	"fmt"
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"net/http"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	token, _ := jwtmiddleware.FromAuthHeader(r)
	fmt.Println("this is invalid??: " + token)
	result, err := jwt.Parse(token, func(token2 *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = "test"
	claims["just fa fun"] = "test"
	result, _ := token.SignedString(secretKey)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(result))
	fmt.Println("sent: " + result)
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
