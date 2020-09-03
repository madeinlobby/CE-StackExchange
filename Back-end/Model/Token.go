package Model

type Token struct {
	Id           string `json:"id"`
	AccountId    string `json:"account_id"`
	TokenCode    string `json:"token_code"`
	CreationDate string `json:"date"`
	Deleted      bool   `json:"deleted"`
}

func GetAllTokens(deleted ...bool) []Token {

}

func GetTokenById(tokenId string, deleted ...bool) Token {

}

func NewToken(accountId string) Token {

}

func generateRandomCode() {

}

func DeleteToken(tokenId string) {

}
