package Model

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

func GetAllAccounts(deleted ...bool) ([]Account, error) {
	return nil, nil
}

func GetAccountById(accountId string, deleted ...bool) (*Account, error) {
	return nil, nil
}

func GetAccountByUsername(username string, deleted ...bool) (*Account, error) {
	return nil, nil
}

func GetAccountByEmail(accountEmail string) (*Account, error) {
	return nil, nil
}

func GetAccountByStudentNumber(accountStudentNumber string) (*Account, error) {
	return nil, nil
}

func NewAccount(username string, password string, isAdmin bool, firstName string, lastName string, email string, studentNumber string, imageUrl string) (*Account, error) {
	return nil, nil
}

func (user *Account) EditAboutMe(new string) error {
	return nil
}

func (user *Account) DeleteAccount() error {
	return nil
}

func (user *Account) EditAccountPassword(password string) error {
	return nil
}

func (user *Account) EditAccountFirstName(firstName string) error {
	return nil
}

func (user *Account) EditAccountLastName(lastName string) error {
	return nil
}

func (user *Account) EditAccountEmail(email string) error {
	return nil
}

func (user *Account) EditAccountImage(imageUrl string) error {
	return nil
}

func (user *Account) AddAccountReputation(addAmount int) error {
	return nil
}

func (answer *Answer) GetAnswerAccount() (*Account, error) {
	return nil, nil
}
