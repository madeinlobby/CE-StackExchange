package Controller

import "github.com/gorilla/mux"

//This function registers all services endpoints to the given Router
func HandleServices(r *mux.Router) {

	routeAccountManagementServices(r.PathPrefix("/accounts").Subrouter())      //routes account management services
	routeCommunityManagementServices(r.PathPrefix("/communities").Subrouter()) //routes community management services
	routePostManagementServices(r.PathPrefix("/posts").Subrouter())            //routes post management services
	routeUserActionsManagementServices(r.PathPrefix("/user").Subrouter())      //routes user actions management services
}

func routeAccountManagementServices(sr *mux.Router) {
	//sr.HandleFunc("/signup", )
}

func routeCommunityManagementServices(sr *mux.Router) {

}

func routePostManagementServices(sr *mux.Router) {

}

func routeUserActionsManagementServices(sr *mux.Router) {

}
