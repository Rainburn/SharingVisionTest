# Sharing Vision Test

## Frontend
### Stacks : HTML, CSS, Javascript (ReactJS)

How to use:
1. Open directory `frontend/`
2. Run `npm start`
3. Frontend will running on localhost:3000

Pages:
1. "/" for dashboard/all posts
2. "/write" to add post
3. "/edit/:id" to edit specific post by id
4. "/preview/:pagenumber" to view all published posts

For example:
1. localhost:3000/
2. localhost:3000/write
3. localhost:3000/edit/2
4. localhost:3000/preview/1

## Backend
### Stacks : Golang, MySQL (Database)

How to use:
1. Open directory `backend`
2. This service utilizes env variables for the MySQL credential. 
Please provide MySQL username, password, and DB name by doing these on Terminal:
```
export MYSQL_USERNAME={your_mysql_username}
export MYSQL_PASSWORD={your_mysql_password}
export DB_NAME={your_database_name} 
```
3. Run `go run *.go`
4. Server will running on localhost:9000

Endpoints were made more than as requested to provide frontend requests. All endpoints are:

1. /article/
>For /article endpoint, there are two methods, GET AND POST.
>GET method is to fetch all posts. Meanwhile POST is to insert new post.
2. /article/:id
>There are four acceptable methods, GET, PUT, PATCH, and DELETE. GET method endpoint is used to fetch a post based on post ID.
>PUT method is used to edit specific post by post ID.
>PATCH method is used to edit specific post, mainly used by "Trash" feature in frontend.
>Meanwhile, DELETE method is for post deletion by ID.
3. /article/:limit/:offset
>For /article/:limit/:offset, only GET method is provided. This endpoint is used to fetch posts with limit and offset.
4. /article/count
>Only supports GET method. This endpoint is meant to get the number of published posts.
5. /article/publish/:limit/:offset
> Only GET method is supported. This is very similar with number #3 but only retrieves PUBLISHED posts.



*Schema (DDL) and some dummy data for the database is included in "backend" folder*

*Export of Postman Collection is placed inside "backend/Postman/" folder*