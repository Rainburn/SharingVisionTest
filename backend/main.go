package main

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/go-playground/validator/v10"
	"net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

var db *sql.DB
var err error

func main() {
	// Connect to database
	db, err = connect()
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}

	// Create validator and create custom validation rule for Status
	v := validator.New()
	_ = v.RegisterValidation("status", func(fl validator.FieldLevel) bool {
		if (fl.Field().String() == "Publish" || fl.Field().String() == "Draft" || fl.Field().String() == "Trash") {
			return true
		}
		return false
	})

	// Create router
	r := echo.New()

	// Create new article. (1)
	r.POST("/article/", func(ctx echo.Context) error {
		var post Post
		post.Title = ctx.FormValue("Title")
		post.Content = ctx.FormValue("Content")
		post.Category = ctx.FormValue("Category")
		post.Status = ctx.FormValue("Status")

		err := v.Struct(post)
		if err != nil {
			log.Print(err)
			return nil
		}

		_, err = db.Exec("INSERT INTO posts (Title, Content, Category, Status) VALUES (?, ?, ?, ?)", post.Title, post.Content, post.Category, post.Status)
		if err != nil {
			log.Print(err)
			return ctx.String(http.StatusOK, err.Error())
		}

		emptyMap := map[string]string{}
		if err != nil {
			log.Print(err)
		}

		return ctx.JSON(http.StatusOK, emptyMap)
	})

	// Show article from DB with pagination on desired limit and offset. (2)
	r.GET("/article/:limit/:offset", func(ctx echo.Context) error {
		limit := ctx.Param("limit")
		offset := ctx.Param("offset")

		var posts []Post

		result, err := db.Query("SELECT Id, Title, Content, Category, Status FROM posts LIMIT ? OFFSET ?", limit, offset)
		if err != nil {
			log.Print(err)
		}

		for result.Next() {
			var post Post
			err := result.Scan(&post.Id, &post.Title, &post.Content, &post.Category, &post.Status)
			if err != nil {
				log.Print(err)
				continue
			}
			posts = append(posts, post)
		}

		return ctx.JSON(http.StatusOK, posts)
	})

	// Show article based on ID. (3)
	r.GET("/article/:id", func(ctx echo.Context) error {
		var post Post
		
		id := ctx.Param("id")
		
		// Get the data based on id
		err := db.QueryRow("SELECT Id, Title, Content, Category, Status FROM posts where id = ?", id).Scan(&post.Id, &post.Title, &post.Content, &post.Category, &post.Status)
		if err != nil {
			if err != sql.ErrNoRows {
				log.Print(err)
			}
			
		}

		return ctx.JSON(http.StatusOK, post)
	})

	// Edit article. (4)
	r.PUT("/article/:id", func(ctx echo.Context) error {
		id := ctx.Param("id")

		var post Post
		post.Title = ctx.FormValue("Title")
		post.Content = ctx.FormValue("Content")
		post.Category = ctx.FormValue("Category")
		post.Status = ctx.FormValue("Status")

		err := v.Struct(post)
		if err != nil {
			log.Print(err)
			return nil
		}

		_, err = db.Exec("UPDATE posts SET Title = ?, Content = ?, Category = ?, Status = ? where id = ? ", post.Title, post.Content, post.Category, post.Status, id)
		if err != nil {
			log.Print(err)
		}

		return ctx.JSON(http.StatusOK, map[string]string{})
	})

	// Delete article. (5)
	r.DELETE("/article/:id", func(ctx echo.Context) error {
		id := ctx.Param("id")

		message := map[string]interface{} {
			"message": fmt.Sprintf("Article with id %s has been deleted", id),
		}

		result, err := db.Exec("DELETE FROM posts where id = ?", id)
		if err != nil {
			log.Print(err)
		}

		numAffected, err := result.RowsAffected()
		if err != nil {
			log.Print(err)
		}

		if (numAffected == 0) {
			message["message"] = fmt.Sprintf("Article with id %s not found", id)
		}

		return ctx.JSON(http.StatusOK, message)
	})

	// Show ALL posts
	r.GET("/article", func(ctx echo.Context) error {
		data := fmt.Sprintf("ID retrieved: %s", ctx.Param("id"))
		return ctx.String(http.StatusOK, data)
	})

	

	r.Start(":9000")
}