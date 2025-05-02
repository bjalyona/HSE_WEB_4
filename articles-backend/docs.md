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

**Example**

##### **GET** `http://localhost:4000/api/article`

##### **Response**

```
[
    {
        "id": 1,
        "title": "title",
        "content": "content",
        "tag": "tag",
        "userId": 1,
        "likesCount": 0,
        "createdAt": "2025-05-02T11:46:43.941Z",
        "updatedAt": "2025-05-02T11:46:43.941Z"
    }
]
```

#### Get Articles By ID

- **URL**: `/article/{id}`
- **Method**: GET
- **Description**: Fetch a specific article by ID.
- **URL Parameters**:
  - `id` (required): The ID of the article.
- **Response**: Returns the article with the given ID.

**Example**

##### **GET** `http://localhost:4000/api/article/1`

##### **Response**

```
{
    "id": 1,
    "title": "title",
    "content": "content",
    "tag": "tag",
    "userId": 1,
    "likesCount": 0,
    "createdAt": "2025-05-02T11:46:43.941Z",
    "updatedAt": "2025-05-02T11:46:43.941Z"
}
```

#### Get Articles By User ID

- **URL**: `/article/user/{user_id}`
- **Method**: GET
- **Description**: Fetch all articles written by a specific user.
- **URL Parameters**:
  - `user_id` (required): The ID of the user.
- **Response**: Returns a list of articles written by the user.

**Example**

##### **GET** `http://localhost:4000/api/article/user/1`

##### **Response**

```
[
    {
        "id": 1,
        "title": "title",
        "content": "content",
        "tag": "tag",
        "userId": 1,
        "likesCount": 0,
        "createdAt": "2025-05-02T11:46:43.941Z",
        "updatedAt": "2025-05-02T11:46:43.941Z"
    },
    {
        "id": 2,
        "title": "title",
        "content": "content",
        "tag": "tag",
        "userId": 1,
        "likesCount": 0,
        "createdAt": "2025-05-02T11:52:13.234Z",
        "updatedAt": "2025-05-02T11:52:13.234Z"
    }
]
```

#### Get Articles By Tag

- **URL**: `/articles/tag/{tag}`
- **Method**: GET
- **Description**: Fetch a specific article by Tag.
- **URL Parameters**:
  - `tag` (required): The tag of the article.
- **Response**: Returns the article with the given Tag.

**Example**

##### **GET** `http://localhost:4000/api/article/tag/tag`

##### **Response**

```
[
    {
        "id": 1,
        "title": "title",
        "content": "content",
        "tag": "tag",
        "userId": 1,
        "likesCount": 0,
        "createdAt": "2025-05-02T11:46:43.941Z",
        "updatedAt": "2025-05-02T11:46:43.941Z"
    },
    {
        "id": 2,
        "title": "title",
        "content": "content",
        "tag": "tag",
        "userId": 1,
        "likesCount": 0,
        "createdAt": "2025-05-02T11:52:13.234Z",
        "updatedAt": "2025-05-02T11:52:13.234Z"
    }
]
```

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
  ```

**Example**

##### **POST** `http://localhost:4000/api/article`

```
{
    "title": "title",
    "content": "content",
    "tag": "tag"
}
```

##### **Response**

```
{
    "id": 1,
    "title": "title",
    "content": "content",
    "tag": "tag",
    "userId": 1,
    "likesCount": 0,
    "createdAt": "2025-05-02T11:46:43.941Z",
    "updatedAt": "2025-05-02T11:46:43.941Z"
}
```

#### Update Article

- **URL**: /article/{id}

- **Method**: PUT

- **Description**: Update an existing article by ID.

**URL Parameters**:

- **id** (required): The ID of the article to update.

- **Request Body**:

```json
{
	"title": "new title",
	"content": "new content",
	"tag": "new tag"
}
```

Response: Returns the updated article object.

### Example

**PUT** `http://localhost:4000/api/article/1`

```json
{
	"title": "new title",
	"content": "new content",
	"tag": "new tag"
}
```

**Response**

```json
{
	"id": 1,
	"title": "new title",
	"content": "new content",
	"tag": "new tag",
	"userId": 1,
	"likesCount": 0,
	"createdAt": "2025-05-02T11:46:43.941Z",
	"updatedAt": "2025-05-02T12:00:12.120Z"
}
```

#### Delete Article

- **URL**: `/article/{id}`

- **Method**: DELETE

- **Description**: Delete an article by ID.

**URL Parameters**:

- **id** (required): The ID of the article to delete.

- **Response**: Returns a success message upon successful deletion.

### Example

**DELETE** http://localhost:4000/api/article/1

```json
{
	"message": "Article deleted successfully"
}
```

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

```
{
    "token": "..."
}
```

#### Update User

- **URL**: `/auth/{id}`

- **Method**: PUT

- **Description**: Update an existing user by ID.

**URL Parameters**:

- **id** (required): The ID of the user to update.

- **Request Body**:

```json
{
	"username": "upd",
	"password": "upd"
}
```

Response: Returns the updated user object.

### Example

**PUT** `http://localhost:4000/api/auth/1`

```json
{
	"username": "upd",
	"password": "upd"
}
```

**Response**

```json
{
	"id": 1,
	"username": "upd",
	"password": "upd",
	"createdAt": "2025-05-02T11:46:22.630Z",
	"updatedAt": "2025-05-02T17:22:49.962Z"
}
```

#### Delete User

- **URL**: `/article/{id}`

- **Method**: DELETE

- **Description**: Delete an user by ID.

**URL Parameters**:

- **id** (required): The ID of the user to delete.

- **Response**: Returns a success message upon successful deletion.

### Example

**DELETE** http://localhost:4000/api/auth/1

```json
{
	"message": "User deleted successfully"
}
```

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
