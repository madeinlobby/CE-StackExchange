package View

import (
	"errors"
	"net/http"
	"strconv"
)

func readBody(r *http.Request) ([]byte, error) {
	size, err := strconv.Atoi(r.Header.Get("size"))
	if err != nil {
		return nil, errors.New("size is not provided in header correctly")
	}

	p := make([]byte, size)
	read, err2 := r.Body.Read(p)

	if read == 0 && err2 != nil {
		return nil, err2
	}

	return p, nil
}
