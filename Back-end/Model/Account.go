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

func GetAllAccounts(deleted ...bool) []Account {
	return nil
}

func GetAccountById(accountId string, deleted ...bool) Account {
	return Account{}
}

func GetAccountByUsername(username string, deleted ...bool) Account {
	return Account{}
}

func NewAccount(username string, password string, isAdmin bool, firstName string, lastName string, email string, studentNumber string, imageUrl string) Account {
	return Account{}
}

func EditAboutMe(new string) {

}

func DeleteAccount(accountId string) {

}

func EditAccountPassword(accountId string, password string) {

}

func EditAccountFirstName(accountId string, firstName string) {

}

func EditAccountLastName(accountId string, lastName string) {

}

func EditAccountEmail(accountId string, email string) {

}

func EditAccountImage(accountId string, imageUrl string) {

}

func AddAccountReputation(accountId string, addAmount int) {

}

// email cannot be repeated for signup. so we need one.
//TODO: notice me senpai
func GetAccountByEmail(accountEmail string) Account {
	return Account{}
}

// student number cannot be repeated for signup. so we need one.
//TODO: notice me senpai
func GetAccountByStudentNumber(accountStudentNumber string) Account {
	return Account{}
}
