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
