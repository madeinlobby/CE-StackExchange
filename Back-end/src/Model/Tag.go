package Model

import (
	"database/sql"
	"errors"
)

type Tag struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Deleted bool   `json:"deleted"`
	Date    string
}

func initTagTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS tags
		(
			tag_id        serial primary key,
			tag_name      varchar(100) NOT NULL UNIQUE,
			date_of_issue date         not null default current_date,
			is_deleted    boolean      not null default false
		);
	`)
	return err
}

func GetTagsByKeyword(keyword string) ([]Tag, error) {
	r, err := db.Query(`SELECT * FROM tags WHERE tag_name ~ $1`, keyword)
	if err != nil {
		return nil, err
	}

	// scans the r for the rows
	var tags []Tag
	for r.Next() {
		var scannedTag = Tag{}
		err = r.Scan(&scannedTag.Id, &scannedTag.Name, &scannedTag.Date, &scannedTag.Deleted)
		if err != nil {
			return nil, errors.New("error fetching the tags")
		}

		tags = append(tags, scannedTag)
	}

	return tags, nil
}

func GetTagById(tagId string, deleted ...bool) (*Tag, error) {
	// checking if the deleted config is specified
	var isDeleted = false
	if len(deleted) != 0 {
		isDeleted = deleted[0]
	}

	// retrieving and processing the result
	var tag = Tag{}
	r := db.QueryRow(`SELECT * FROM tags WHERE tag_id = $1 AND deleted = $2`, tagId, isDeleted)
	err := r.Scan(&tag.Id, &tag.Name, &tag.Date, &tag.Deleted)

	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("there is no such tag")
	case nil:
		return &tag, nil
	default:
		return nil, err
	}
}

func NewTag(name string) (*Tag, error) {
	// add new tag
	r := db.QueryRow(`INSERT INTO tags (tag_name) values ($1) returning *;`, name)

	// retrieves the created tag and returns the result
	var newTag = Tag{}
	err := r.Scan(&newTag.Id, &newTag.Name, &newTag.Deleted, &newTag.Date)

	if err != nil {
		return nil, err
	}

	return &newTag, nil
}

func (tag Tag) DeleteTag() error {
	r := db.QueryRow(`UPDATE tags 
							SET is_deleted = TRUE
							WHERE tag_id = $1
							RETURNING is_deleted			
	`, tag.Id)
	return r.Scan(&tag.Deleted)
}
