# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:

```docs/api-documentation.md
Authorization: Bearer <your_jwt_token>
```

## Error Handling
The API returns consistent error responses in the following format:

```json
{
  "message": "Error message here",
  "error": "Detailed error information (if available)"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Endpoints

### Authentication
#### Login
```http
POST /auth/login
```

Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Posts
#### Get All Posts
```http
GET /posts
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "featuredImage": "string",
      "status": "draft|published",
      "author": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Create Post (Protected)
```http
POST /posts
```

Request Body (multipart/form-data):
```json
{
  "title": "string",
  "description": "string",
  "status": "draft|published",
  "tags": "string|array",
  "image": "file (optional)"
}
```

Response:
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "featuredImage": "string",
    "imagePublicId": "string",
    "status": "draft|published",
    "author": {
      "id": "string",
      "name": "string",
      "email": "string",
      "avatar": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Programs
#### Get All Programs
```http
GET /programs
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "featuredImage": "string",
      "status": "draft|published",
      "author": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Create Program (Protected)
```http
POST /programs
```

Request Body (multipart/form-data):
```json
{
  "title": "string",
  "description": "string",
  "status": "draft|published",
  "image": "file (optional)"
}
```

Response:
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "featuredImage": "string",
    "imagePublicId": "string",
    "status": "draft|published",
    "author": {
      "id": "string",
      "name": "string",
      "email": "string",
      "avatar": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```
### Events
#### Get All Events
```http
GET /events
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "date": "string",
      "featuredImage": "string",
      "status": "draft|published",
      "author": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Create Event (Protected)
```http
POST /events
```

Request Body (multipart/form-data):
```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "status": "draft|published",
  "image": "file (optional)"
}
```

### Categories
#### Get All Categories
```http
GET /categories
```

Query Parameters:
```
type: string (optional) - Filter by category type (default: 'gallery')
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "type": "string"
    }
  ]
}
```

#### Create Category (Protected)
```http
POST /categories
```

Request Body:
```json
{
  "name": "string",
  "type": "string (default: gallery)"
}
```

### Gallery
#### Get All Images
```http
GET /gallery
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "imageUrl": "string",
      "category": {
        "id": "string",
        "name": "string"
      },
      "status": "draft|published",
      "author": {
        "id": "string",
        "name": "string",
        "email": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Upload Image (Protected)
```http
POST /gallery
```

Request Body (multipart/form-data):
```json
{
  "title": "string",
  "category": "string (category id)",
  "status": "draft|published",
  "image": "file (required)"
}
```

### Settings (Protected)
#### Get Settings
```http
GET /settings
```

Response:
```json
{
  "data": {
    "siteName": "string",
    "siteDescription": "string",
    "contactEmail": "string",
    "contactPhone": "string",
    "address": "string",
    "socialMedia": {
      "facebook": "string",
      "twitter": "string",
      "instagram": "string",
      "linkedin": "string",
      "youtube": "string"
    },
    "appearance": {
      "logo": "string",
      "favicon": "string",
      "primaryColor": "string",
      "secondaryColor": "string"
    }
  }
}
```

#### Update Settings (Protected)
```http
PUT /settings
```

Request Body (multipart/form-data):
```json
{
  "siteName": "string",
  "siteDescription": "string",
  "contactEmail": "string",
  "contactPhone": "string",
  "address": "string",
  "socialMedia": {
    "facebook": "string",
    "twitter": "string",
    "instagram": "string",
    "linkedin": "string",
    "youtube": "string"
  },
  "logo": "file (optional)",
  "favicon": "file (optional)",
  "primaryColor": "string",
  "secondaryColor": "string"
}
```

### Users (Protected - Admin Only)
#### Get All Users
```http
GET /users
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "admin|user",
      "avatar": "string",
      "status": "active|inactive",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Get Single User
```http
GET /users/:id
```

Response:
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "admin|user",
    "avatar": "string",
    "status": "active|inactive",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Create User
```http
POST /users
```

Request Body (multipart/form-data):
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin|user",
  "status": "active|inactive",
  "avatar": "file (optional)"
}
```

Response:
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "admin|user",
    "avatar": "string",
    "status": "active|inactive",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Update User
```http
PUT /users/:id
```

Request Body (multipart/form-data):
```json
{
  "name": "string",
  "email": "string",
  "password": "string (optional)",
  "role": "admin|user",
  "status": "active|inactive",
  "avatar": "file (optional)"
}
```

#### Delete User
```http
DELETE /users/:id
```

Response:
```json
{
  "message": "User deleted successfully"
}
```

#### Update Own Profile (Protected)
```http
PUT /users/profile
```

Request Body (multipart/form-data):
```json
{
  "name": "string",
  "email": "string",
  "currentPassword": "string (required for password change)",
  "newPassword": "string (optional)",
  "avatar": "file (optional)"
}
```