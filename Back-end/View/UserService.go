package View

import "net/http"

func Signup(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("signup"))
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("login"))
}

func Logout(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("logout"))
}

func AskQuestion(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("ask"))
}

func AnswerQuestion(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("answer"))
}

func CommentOnPost(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("comment on post"))
}

func CommentOnComment(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("comment on comment"))
}
