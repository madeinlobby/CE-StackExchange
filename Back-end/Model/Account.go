package Model

type Account struct {
	Id              string `json:"id"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	IsAdmin         bool   `json:"is_admin"`
	FullName        string `json:"full_name"`
	Email           string `json:"email"`
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

func NewAccount(username string, password string, isAdmin bool, fullName string, email string, imageUrl string) Account {
	return Account{}
}

func DeleteAccount(accountId string) {

}

func EditAccountPassword(accountId string, password string) {

}

func EditAccountFullName(accountId string, fullName string) {

}

func EditAccountEmail(accountId string, email string) {

}

func EditAccountImage(accountId string, imageUrl string) {

}

func AddAccountReputation(accountId string, addAmount int) {

}
