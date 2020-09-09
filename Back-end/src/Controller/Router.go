package Controller

import (
	"github.com/gorilla/mux"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/View"
	"net/http"
)

//This function registers all services endpoints to the given Router
func HandleServices(r *mux.Router) {
	routeCommunityService(r.PathPrefix("/communities").Subrouter())
	routePostService(r.PathPrefix("/posts").Subrouter())
	routeUserService(r.PathPrefix("/user").Subrouter())
	routeTagService(r.PathPrefix("/tags").Subrouter())
}

func routeCommunityService(sr *mux.Router) {
	sr.HandleFunc("/all", View.GetAllCommunities).Methods(http.MethodGet)
	sr.HandleFunc("/new", View.CreateNewCommunity).Methods(http.MethodPost)
}

func routePostService(sr *mux.Router) {
	sr.HandleFunc("/questions/{id}/basic_info", View.GetQuestionInfo).Methods(http.MethodGet)
	sr.HandleFunc("/questions/{id}/answers", View.GetAnswersOfQuestion).Methods(http.MethodGet)
	sr.HandleFunc("/answers/{id}", View.GetAnswerInfo).Methods(http.MethodGet)
	sr.HandleFunc("/cluster", View.GetPostCluster).Methods(http.MethodGet)
}

func routeUserService(sr *mux.Router) {
	sr.HandleFunc("/signup", View.Signup).Methods(http.MethodPost)
	sr.HandleFunc("/login", View.Login).Methods(http.MethodPost)
	sr.HandleFunc("/posts", View.GetUserPosts).Methods(http.MethodGet)
	// routes that require authorization
	sr.Handle("/logout", myJwtMiddleWare.Handler(http.HandlerFunc(View.Logout))).Methods(http.MethodPost)
	sr.Handle("/actions/ask", myJwtMiddleWare.Handler(http.HandlerFunc(View.AskQuestion))).Methods(http.MethodPost)
	sr.Handle("/actions/answer", myJwtMiddleWare.Handler(http.HandlerFunc(View.AnswerQuestion))).Methods(http.MethodPost)
	sr.Handle("/actions/comment/on_question", myJwtMiddleWare.Handler(http.HandlerFunc(View.CommentOnQuestion))).Methods(http.MethodPost)
	sr.Handle("/actions/comment/on_answer", myJwtMiddleWare.Handler(http.HandlerFunc(View.CommentOnAnswer))).Methods(http.MethodPost)
	sr.Handle("/actions/comment/on_comment", myJwtMiddleWare.Handler(http.HandlerFunc(View.CommentOnComment))).Methods(http.MethodPost)
	sr.Handle("/profile", myJwtMiddleWare.Handler(http.HandlerFunc(View.GetUserProfileInfo))).Methods(http.MethodGet)
}

func routeTagService(sr *mux.Router) {
	sr.HandleFunc("/", View.GetListOfTags).Methods(http.MethodGet)
	// routes that require authorization
	sr.Handle("/new", myJwtMiddleWare.Handler(http.HandlerFunc(View.CreateNewTag))).Methods(http.MethodPost)
}
