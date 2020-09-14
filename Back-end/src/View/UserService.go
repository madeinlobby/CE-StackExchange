package View

import (
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Model"
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
	err = json.Unmarshal(body, &signupCredentials)
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
	_, err = Model.NewAccount(signupCredentials.Username,
		signupCredentials.Password,
		false,
		signupCredentials.FirstName,
		signupCredentials.LastName,
		signupCredentials.Email,
		signupCredentials.StudentNumber,
		"")

	if err != nil {
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
	_, _ = w.Write([]byte(token))
}

func Login(w http.ResponseWriter, r *http.Request) {
	// extract body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read the body "+err.Error(), http.StatusInternalServerError)
		return
	}

	loginCredentials := loginRequest{}
	err = json.Unmarshal(body, &loginCredentials)
	if err != nil {
		http.Error(w, "error: could not parse body "+err.Error(), http.StatusBadRequest)
		return
	}

	// check credentials
	var user *Model.Account
	user, err = Model.GetAccountByUsername(loginCredentials.Username)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if user == nil {
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
	_, _ = w.Write([]byte(token))
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
	err = json.Unmarshal(body, &askQuestionInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// ask the question and return the result
	_, err = Model.NewQuestion(currAcc.Id, askQuestionInfo.Community,
		askQuestionInfo.Title, askQuestionInfo.Body, askQuestionInfo.TagArr)

	if err != nil {
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
	err = json.Unmarshal(body, &answerQuestionInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// answer the question and return the result
	_, err = Model.NewAnswer(currAcc.Id, answerQuestionInfo.QuestionId, answerQuestionInfo.AnswerBody)

	if err != nil {
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
	err = json.Unmarshal(body, &commentInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// getting the question
	var q *Model.Question
	q, err = Model.GetQuestionById(commentInfo.QuestionId)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if q == nil {
		http.Error(w, "error: no such question found", http.StatusNotFound)
		return
	}

	// commenting and returning the result
	_, err = q.AddComment(currAcc.Id, commentInfo.Comment)
	if err != nil {
		http.Error(w, "error: could not submit the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
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
	err = json.Unmarshal(body, &commentInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// getting the answer
	var a *Model.Answer
	a, err = Model.GetAnswerById(commentInfo.AnswerId)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if a == nil {
		http.Error(w, "error: no such answer exists", http.StatusNotFound)
		return
	}

	// commenting and returning the result
	_, err = a.AddComment(currAcc.Id, commentInfo.Comment)
	if err != nil {
		http.Error(w, "error: could not submit the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func CommentOnComment(w http.ResponseWriter, r *http.Request) {
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

	commentInfo := commentOnCommentRequest{}
	err = json.Unmarshal(body, &commentInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// getting the comment
	var parComment *Model.Comment
	parComment, err = Model.GetCommentById(commentInfo.ParentId)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if parComment == nil {
		http.Error(w, "error: no such comment exists", http.StatusNotFound)
		return
	}

	// commenting and returning the result
	_, err = parComment.CommentOnComment(currAcc.Id, commentInfo.ChildBody)
	if err != nil {
		http.Error(w, "error: could not comment on the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func GetUserPosts(w http.ResponseWriter, r *http.Request) {
	// extract and translate body
	var body []byte
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error: could not read body", http.StatusInternalServerError)
		return
	}

	requestInfo := getUserPostsRequest{}
	err = json.Unmarshal(body, &requestInfo)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// validate the request info
	var user *Model.Account
	user, err = Model.GetAccountByUsername(requestInfo.Username)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if user == nil {
		http.Error(w, "error: no such user exists", http.StatusNotFound)
		return
	} else if requestInfo.Opt != "q" && requestInfo.Opt != "a" && requestInfo.Opt != "all" {
		http.Error(w, "error: incorrect option", http.StatusBadRequest)
		return
	}

	// get the posts. uses the getQuestionInfo and getAnswerInfo functions in PostService.go
	posts := struct {
		Questions []questionBasicInfo `json:"array of questions"`
		Answers   []answerBasicInfo   `json:"array of answers"`
	}{}
	if requestInfo.Opt != "a" {
		// adds all questions
		questions, err := user.GetQuestions()
		if err != nil {
			http.Error(w, "error: could not retrieve questions", http.StatusInternalServerError)
			return
		}

		for _, q := range questions {
			inf, err := getQuestionInfo(&q)
			if err != nil {
				http.Error(w, "error: could not retrieve questions", http.StatusInternalServerError)
				return
			}
			posts.Questions = append(posts.Questions, *inf)
		}
	}

	if requestInfo.Opt != "q" {
		// adds all answers
		answers, err := user.GetAnswers()
		if err != nil {
			http.Error(w, "error: could not retrieve answers", http.StatusInternalServerError)
			return
		}

		for _, a := range answers {
			inf, err := getAnswerInfo(&a)
			if err != nil {
				http.Error(w, "error: could not retrieve answers", http.StatusInternalServerError)
				return
			}
			posts.Answers = append(posts.Answers, *inf)
		}
	}

	// returns the result
	var out []byte
	out, err = json.Marshal(&posts)
	if err != nil {
		http.Error(w, "error: could not serialize the result", http.StatusInternalServerError)
		return
	}

	_, _ = w.Write(out)
}

func GetUserProfileInfo(w http.ResponseWriter, r *http.Request) {
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

	request := getUserProfileInfoRequest{}
	err = json.Unmarshal(body, &request)
	if err != nil {
		http.Error(w, "error: could not parse body", http.StatusBadRequest)
		return
	}

	// validate the request
	var user *Model.Account
	user, err = Model.GetAccountByUsername(request.Username)
	if err != nil {
		http.Error(w, "error: "+err.Error(), http.StatusInternalServerError)
		return
	} else if user == nil {
		http.Error(w, "error: no such user exists", http.StatusNotFound)
		return
	}

	// return the result
	response := userProfileInfo{
		IsForOwn:      currAcc.Username == user.Username,
		Username:      user.Username,
		FirstName:     user.FirstName,
		LastName:      user.LastName,
		Email:         user.Email,
		StudentNumber: user.StudentNumber,
		AboutMe:       user.AboutMe,
	}

	var result []byte
	result, err = json.Marshal(&response)
	if err != nil {
		http.Error(w, "error: could not serialize the result", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(result)
}
