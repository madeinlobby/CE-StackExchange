package Controller

import (
	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
)

// its a complete copy...but you know...bite me!

var SecretKey = []byte("Xp2s5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdS")

var myJwtMiddleWare = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	},

	SigningMethod: jwt.SigningMethodHS256,
})
