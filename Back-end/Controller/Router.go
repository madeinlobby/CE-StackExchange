package Controller

import (
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/View"
	"net/http"
)

//This function registers all services endpoints to the given Router
func HandleServices(r *mux.Router) {
	routeCommunityManagementServices(r.PathPrefix("/communities").Subrouter()) //routes community management services
	routePostManagementServices(r.PathPrefix("/posts").Subrouter())            //routes post management services
	routeUserManagementServices(r.PathPrefix("/user").Subrouter())             //routes user actions management services
}

func routeCommunityManagementServices(sr *mux.Router) {
	sr.HandleFunc("/all", View.GetAllCommunities).Methods("GET")
	sr.HandleFunc("/new", View.CreateNewCommunity).Methods("POST")
}

func routePostManagementServices(sr *mux.Router) {
	sr.HandleFunc("/questions/{id}/basic_info", View.GetQuestionInfo).Methods("GET")
	sr.HandleFunc("/questions/{id}/answers", View.GetAnswersOfQuestion).Methods("GET")
	sr.HandleFunc("/answers/{id}", View.GetAnswerInfo).Methods("GET")
	sr.HandleFunc("/cluster", View.GetPostCluster).Methods("GET")
}

func routeUserManagementServices(sr *mux.Router) {
	sr.HandleFunc("/signup", View.Signup).Methods("POST")
	sr.HandleFunc("/login", View.Login).Methods("POST")
	// routes that require authorization
	sr.Handle("/logout", JwtMiddleWare.Handler(http.HandlerFunc(View.Logout))).Methods("POST")
	sr.Handle("/actions/ask", JwtMiddleWare.Handler(http.HandlerFunc(View.AskQuestion))).Methods("POST")
	sr.Handle("/actions/answer", JwtMiddleWare.Handler(http.HandlerFunc(View.AnswerQuestion))).Methods("POST")
	sr.Handle("/actions/comment/on_post", JwtMiddleWare.Handler(http.HandlerFunc(View.CommentOnPost))).Methods("POST")
	sr.Handle("/actions/comment/on_comment", JwtMiddleWare.Handler(http.HandlerFunc(View.CommentOnComment))).Methods("POST")
}
