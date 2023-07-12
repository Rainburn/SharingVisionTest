package main

import (
	"os"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"fmt"
)

type Post struct {
	Id int64 `json:"Id"`
	Title string `json:"Title" validate:"required,min=20"`
	Content string `json:"Content" validate:"required,min=200"`
	Category string `json:"Category" validate:"required,min=3"`
	Status string `json:"Status" validate:"required,status"`
}

func connect() (*sql.DB, error) {
	username := os.Getenv("MYSQL_USERNAME")
	password := os.Getenv("MYSQL_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	if username == "" {
		log.Fatal("DB Username config is required")
	}

	if dbName == "" {
		log.Fatal("Database name config is required")
	}


	mysql_credential := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?parseTime=true", username, password, dbName)

	db, err := sql.Open("mysql", mysql_credential)
	if err != nil {
		return nil, err
	}
	return db, nil
}