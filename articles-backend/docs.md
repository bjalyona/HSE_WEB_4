# API Documentation

## Base URL
The base URL for all API endpoints is: http://localhost:4000/api

```
http://localhost:4000/api
```

## Authentication
All requests to the API require a **Bearer token** for authentication. You can use the following token for testing:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzQ2MTE3NDQ3LCJleHAiOjE3NDY3MjIyNDd9.4gPQGeNRSiyZzUAILnpJoLds896vGVpvm6cOgDzAUko
```


---

## Endpoints

### Articles

#### Get All Articles
- **URL**: `/article`
- **Method**: GET
- **Description**: Fetch all articles.
- **Response**: Returns a list of all articles.

#### Get Articles By ID
- **URL**: `/articles/{id}`
- **Method**: GET
- **Description**: Fetch a specific article by ID.
- **URL Parameters**: 
  - `id` (required): The ID of the article.
- **Response**: Returns the article with the given ID.

#### Get Articles By User ID
- **URL**: `/article/user/{user_id}`
- **Method**: GET
- **Description**: Fetch all articles written by a specific user.
- **URL Parameters**: 
  - `user_id` (required): The ID of the user.
- **Response**: Returns a list of articles written by the user.

#### Create Article
- **URL**: `/article`
- **Method**: POST
- **Description**: Create a new article.
- **Request Body**:
  ```json
  {
    "title": "title",
    "content": "content",
    "tag": "tag"
  }


#### Get Articles By Tag
- **URL**: `/articles/tag/{tag}`
- **Method**: GET
- **Description**: Fetch a specific article by Tag.
- **URL Parameters**: 
  - `tag` (required): The tag of the article.
- **Response**: Returns the article with the given Tag.

### Users

#### Register
- **URL**: `/auth/register`
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```
- **Response**: Returns a success message or an error.

#### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```
- **Response**: Returns a JWT token upon successful login.

---

### Likes

#### Like Article
- **URL**: `/like/like`
- **Method**: POST
- **Description**: Like an article.
- **Request Body**:
  ```json
  {
    "articleId": 1
  }
  ```
- **Response**: Returns a success message.

#### Unlike Article
- **URL**: `/like/unlike`
- **Method**: POST
- **Description**: Unlike an article.
- **Request Body**:
  ```json
  {
    "articleId": "1"
  }
  ```
- **Response**: Returns a success message.

#### Is Liked
- **URL**: `/like/is-liked`
- **Method**: GET
- **Description**: Check if an article is liked.
- **Query Parameters**: 
  - `articleId` (required): The ID of the article.
- **Response**: Returns whether the article is liked.

---

## Example Requests

### Get All Articles
```bash
curl -X GET "http://localhost:4000/api/article" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzQ2MTE3NDQ3LCJleHAiOjE3NDY3MjIyNDd9.4gPQGeNRSiyZzUAILnpJoLds896vGVpvm6cOgDzAUko"
```

### Register New User
```bash
curl -X POST "http://localhost:4000/api/auth/register" \
-H "Content-Type: application/json" \
-d '{
    "username": "user",
    "password": "pass"
}'
```

---

## Response Format

Responses will be returned in JSON format. A typical response will look like this:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Article Title",
    "content": "Article content",
    "tag": "tag"
  }
}
```

---

## Errors

Error responses will be returned with the following structure:

```json
{
  "status": "error",
  "message": "Error message describing what went wrong"
}
```

---

## Notes
- All endpoints require the `Authorization` header with a valid Bearer token.
- Ensure you are passing the correct `articleId` and `userId` where required.
- For `POST` requests, ensure the body is in JSON format as shown in the examples.

---
