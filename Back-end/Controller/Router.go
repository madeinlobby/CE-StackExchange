package Controller

import (
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/View"
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
	sr.HandleFunc("/logout", View.Logout).Methods("POST")
	sr.HandleFunc("/actions/ask", View.AskQuestion).Methods("POST")
	sr.HandleFunc("/actions/answer", View.AnswerQuestion).Methods("POST")
	sr.HandleFunc("/actions/comment/on_post", View.CommentOnPost).Methods("POST")
	sr.HandleFunc("/actions/comment/on_comment", View.CommentOnComment).Methods("POST")
}
