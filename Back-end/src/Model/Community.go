package Model

import (
	"database/sql"
	"errors"
)

type Community struct {
	Id          string `json:"id" yaml:"-"`
	Name        string `json:"name" yaml:"name"`
	Description string `json:"info_text" yaml:"-"`
	Deleted     bool   `json:"deleted" yaml:"-"`
	Date        string
}

func initCommunityTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS communities
		(
			community_id   serial PRIMARY KEY,
			community_name varchar(100) NOT NULL UNIQUE,
			description    text,
			is_deleted     boolean      NOT NULL DEFAULT False,
			date_of_issue  date         NOT NULL DEFAULT current_date
		);
	`)
	return err
}

func GetCommunityById(communityId string, deleted ...bool) (*Community, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var community = Community{}
	r := db.QueryRow(`SELECT * FROM communities WHERE community_id = $1 AND deleted = $2`, communityId, isDeleted)
	err := r.Scan(&community.Id, &community.Name, &community.Description, &community.Date, &community.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such community")
	case nil:
		return &community, nil
	default:
		return nil, err
	}
}

func GetCommunityByName(communityName string, deleted ...bool) (*Community, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var community = Community{}
	r := db.QueryRow(`SELECT * FROM communities WHERE community_name = $1 AND deleted = $2`, communityName, isDeleted)
	err := r.Scan(&community.Id, &community.Name, &community.Description, &community.Date, &community.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such community")
	case nil:
		return &community, nil
	default:
		return nil, err
	}
}

func NewCommunity(name string, description string) (*Community, error) {
	// add new community
	r := db.QueryRow(`INSERT INTO communities (
                     community_name, description)
					  values ($1, $2) returning *;`,
		name, description)

	// retrieves the created community and returns the result
	var newCommunity = Community{}
	err := r.Scan(&newCommunity.Id, &newCommunity.Name, &newCommunity.Description, &newCommunity.Deleted, &newCommunity.Date)

	if err != nil {
		return nil, err
	}

	return &newCommunity, nil
}

func (community *Community) DeleteCommunity() error {
	r := db.QueryRow(`UPDATE communities 
							SET is_deleted = TRUE
							WHERE community_id = $1
							RETURNING is_deleted			
	`, community.Id)
	return r.Scan(&community.Deleted)
}
