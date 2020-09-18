package Model

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/madeinlobby/CE-StackExchange/Back-end/src/Resources"
)

var db *sql.DB

func InitDatabase(config *Resources.Config) error {
	var err error

	// getting the config required
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.DBHost, config.DBPort,
		config.DBUser, config.DBPass, config.DBName)

	// connecting to database
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		return err
	}

	// pinging the database to check the connection
	err = db.Ping()
	if err != nil {
		return err
	}

	// initialize the database tables if not exist
	err = initTables()
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

func initTables() error {
	// initializes the tables in an hierarchical order
	err := initAccountTable()
	if err != nil {
		return err
	}
	err = initCommunityTable()
	if err != nil {
		return err
	}
	err = initQuestionTable()
	if err != nil {
		return err
	}
	err = initAnswerTable()
	if err != nil {
		return err
	}
	err = initApprovalTable()
	if err != nil {
		return err
	}
	err = initBookmarkTable()
	if err != nil {
		return err
	}
	err = initCommentTable()
	if err != nil {
		return err
	}
	err = initTagTable()
	if err != nil {
		return err
	}
	err = initTagQuestionTable()
	if err != nil {
		return err
	}
	err = initVoteTable()
	if err != nil {
		return err
	}
	return nil
}
