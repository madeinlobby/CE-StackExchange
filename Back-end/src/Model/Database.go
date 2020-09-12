package Model

import (
	"database/sql"
	"fmt"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Resources"
)

var db *sql.DB

func InitDatabase(config *Resources.Config) error {
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.DBHost, config.DBPort,
		config.DBUser, config.DBPass, config.DBName)

	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		return err
	}
	fmt.Println("database connected successfully")
	return nil
}

func CloseDatabase() {
	err := db.Close()
	if err != nil {
		panic(err)
	}
}
