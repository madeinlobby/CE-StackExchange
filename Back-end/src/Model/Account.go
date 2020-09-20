package Model

import (
	"database/sql"
	"errors"
)

type Account struct {
	Id              string `json:"id"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	IsAdmin         bool   `json:"is_admin"`
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Email           string `json:"email"`
	StudentNumber   string `json:"student_number"`
	AboutMe         string `json:"about_me"`
	CreationDate    string `json:"creation_date"`
	ProfileImageUrl string `json:"profile_image_url"`
	Reputation      int    `json:"reputation"`
	Deleted         bool   `json:"deleted"`
}

func initAccountTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS accounts
		(
			user_id           serial PRIMARY KEY,
			username          varchar(50) UNIQUE  NOT NULL,
			password          varchar(50)         NOT NULL,
			student_number    char(9) UNIQUE      NOT NULL,
			email             varchar(200) UNIQUE NOT NULL,
			is_user_admin     boolean             NOT NULL,
			first_name        varchar(50)         NOT NULL,
			last_name         varchar(50)         NOT NULL,
			about_me          text,
			date_of_issue     date                NOT NULL DEFAULT current_date,
			profile_image_url text,
			reputation        int8                         DEFAULT 0,
			deleted           boolean                      DEFAULT false
		);
	`)
	return err
}

func GetAccountById(accountId string, deleted ...bool) (*Account, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var user Account
	r := db.QueryRow(`SELECT * FROM accounts WHERE user_id = $1 AND deleted = $2`, accountId, isDeleted)
	err := r.Scan(&user.Id, &user.Username, &user.Password, &user.StudentNumber,
		&user.Email, &user.IsAdmin, &user.FirstName, &user.LastName, &user.AboutMe,
		&user.CreationDate, &user.ProfileImageUrl, &user.Reputation, &user.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such account")
	case nil:
		return &user, nil
	default:
		return nil, err
	}
}

func GetAccountByUsername(username string, deleted ...bool) (*Account, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var user Account
	r := db.QueryRow(`SELECT * FROM accounts WHERE username = $1 AND deleted = $2`, username, isDeleted)
	err := r.Scan(&user.Id, &user.Username, &user.Password, &user.StudentNumber,
		&user.Email, &user.IsAdmin, &user.FirstName, &user.LastName, &user.AboutMe,
		&user.CreationDate, &user.ProfileImageUrl, &user.Reputation, &user.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such account")
	case nil:
		return &user, nil
	default:
		return nil, err
	}
}

func GetAccountByEmail(accountEmail string, deleted ...bool) (*Account, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var user Account
	r := db.QueryRow(`SELECT * FROM accounts WHERE email = $1 AND deleted = $2`, accountEmail, isDeleted)
	err := r.Scan(&user.Id, &user.Username, &user.Password, &user.StudentNumber,
		&user.Email, &user.IsAdmin, &user.FirstName, &user.LastName, &user.AboutMe,
		&user.CreationDate, &user.ProfileImageUrl, &user.Reputation, &user.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such account")
	case nil:
		return &user, nil
	default:
		return nil, err
	}
}

func GetAccountByStudentNumber(accountStudentNumber string, deleted ...bool) (*Account, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var user Account
	r := db.QueryRow(`SELECT * FROM accounts WHERE student_number = $1 AND deleted = $2`, accountStudentNumber, isDeleted)
	err := r.Scan(&user.Id, &user.Username, &user.Password, &user.StudentNumber,
		&user.Email, &user.IsAdmin, &user.FirstName, &user.LastName, &user.AboutMe,
		&user.CreationDate, &user.ProfileImageUrl, &user.Reputation, &user.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such account")
	case nil:
		return &user, nil
	default:
		return nil, err
	}
}

func NewAccount(username string, password string, isAdmin bool, firstName string, lastName string, email string, studentNumber string, imageUrl string) (*Account, error) {
	// add new account
	r := db.QueryRow(`INSERT INTO accounts (
                     username,
                     password,
                     student_number,
                     email,
                     is_user_admin,
                     first_name,
                     last_name,
                     profile_image_url,
                      about_me)
					  values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *;`,
		username, password, studentNumber, email, isAdmin, firstName, lastName, imageUrl)

	// retrieves the created account and returns the result
	var newUser Account
	err := r.Scan(&newUser.Id, &newUser.Username, &newUser.Password, &newUser.StudentNumber,
		&newUser.Email, &newUser.IsAdmin, &newUser.FirstName, &newUser.LastName, &newUser.AboutMe,
		&newUser.CreationDate, &newUser.ProfileImageUrl, &newUser.Reputation, &newUser.Deleted)

	if err != nil {
		return nil, err
	}

	return &newUser, nil
}

// updates entry and updates the value in given object if successful
func (user *Account) EditAboutMe(aboutMe string) error {
	r := db.QueryRow(`UPDATE accounts 
							SET about_me = $2
							WHERE user_id = $1
							RETURNING about_me					
	`, user.Id, aboutMe)
	return r.Scan(&user.AboutMe)
}

func (user *Account) DeleteAccount() error {
	return nil
}

// updates entry and updates the value in given object if successful
func (user *Account) EditAccountPassword(password string) error {
	r := db.QueryRow(`UPDATE accounts 
							SET accounts.password = $2
							WHERE user_id = $1
							RETURNING accounts.password					
	`, user.Id, password)
	return r.Scan(&user.Password)
}

// updates entry and updates the value in given object if successful
func (user *Account) EditAccountFirstName(firstName string) error {
	r := db.QueryRow(`UPDATE accounts 
							SET first_name = $2
							WHERE user_id = $1
							RETURNING first_name					
	`, user.Id, firstName)
	return r.Scan(&user.FirstName)
}

// updates entry and updates the value in given object if successful
func (user *Account) EditAccountLastName(lastName string) error {
	r := db.QueryRow(`UPDATE accounts 
							SET last_name = $2
							WHERE user_id = $1
							RETURNING last_name					
	`, user.Id, lastName)
	return r.Scan(&user.LastName)
}

// updates entry and updates the value in given object if successful
func (user *Account) EditAccountImage(imageUrl string) error {
	r := db.QueryRow(`UPDATE accounts 
							SET profile_image_url = $2
							WHERE user_id = $1
							RETURNING profile_image_url					
	`, user.Id, imageUrl)
	return r.Scan(&user.ProfileImageUrl)
}

func (user *Account) AddAccountReputation(addAmount int) error {
	r := db.QueryRow(`UPDATE accounts 
							SET reputation = $2
							WHERE user_id = $1
							RETURNING reputation					
	`, user.Id, user.Reputation+addAmount)
	return r.Scan(&user.Reputation)
}

func (answer *Answer) GetAnswerAccount() (*Account, error) {
	r := db.QueryRow(`SELECT * FROM accounts
							WHERE user_id = $1
	`, answer.AccountId)

	var user Account
	err := r.Scan(&user.Id, &user.Username, &user.Password, &user.StudentNumber,
		&user.Email, &user.IsAdmin, &user.FirstName, &user.LastName, &user.AboutMe,
		&user.CreationDate, &user.ProfileImageUrl, &user.Reputation, &user.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("error retrieving the user")
	case nil:
		return &user, nil
	default:
		return nil, err
	}
}
