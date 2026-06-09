# REST API Documentation

Base URL locally: `http://localhost:5000/api`

Swagger UI: `http://localhost:5000/api/docs`

Use JWT auth header for protected routes:

```http
Authorization: Bearer YOUR_TOKEN
```

## Auth

Register:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ravi Shah",
  "email": "ravi@example.com",
  "phone": "9999999999",
  "password": "secret123",
  "role": "seeker",
  "address": "Ahmedabad",
  "latitude": 23.0225,
  "longitude": 72.5714
}
```

Response:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "mongo-id",
    "name": "Ravi Shah",
    "role": "seeker"
  }
}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ravi@example.com",
  "password": "secret123"
}
```

Forgot password:

```http
POST /api/auth/forgot-password
Content-Type: application/json

{ "email": "ravi@example.com" }
```

Reset password:

```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{ "password": "newSecret123" }
```

## Tasks

Create request:

```http
POST /api/tasks
Authorization: Bearer SEEKER_TOKEN
Content-Type: application/json

{
  "category": "Aadhaar Update",
  "title": "Need help updating Aadhaar mobile number",
  "description": "I need help booking and filling the form.",
  "address": "Paldi, Ahmedabad",
  "phone": "9999999999",
  "latitude": 23.012,
  "longitude": 72.56
}
```

List tasks:

```http
GET /api/tasks?status=pending&category=Aadhaar%20Update&search=Paldi
Authorization: Bearer TOKEN
```

Nearby tasks:

```http
GET /api/tasks/nearby?latitude=23.0225&longitude=72.5714&distance=5
Authorization: Bearer VOLUNTEER_TOKEN
```

Accept task:

```http
POST /api/tasks/:id/accept
Authorization: Bearer VOLUNTEER_TOKEN
```

Complete task with proof:

```http
POST /api/tasks/:id/complete
Authorization: Bearer VOLUNTEER_TOKEN
Content-Type: multipart/form-data

completionNote=Form submitted successfully
proofImage=@proof.jpg
```

## Admin

Dashboard stats:

```http
GET /api/users/stats
Authorization: Bearer ADMIN_TOKEN
```

Ban user:

```http
PATCH /api/users/:id/ban
Authorization: Bearer ADMIN_TOKEN
```

Delete task:

```http
DELETE /api/tasks/:id
Authorization: Bearer ADMIN_TOKEN
```

## Surveys

Submit:

```http
POST /api/surveys
Content-Type: application/json

{
  "q1": true,
  "q2": false,
  "q3": true,
  "q4": true,
  "q5": true,
  "city": "Ahmedabad",
  "comments": "Gujarati support is important."
}
```

Analytics:

```http
GET /api/surveys/analytics
Authorization: Bearer ADMIN_TOKEN
```

CSV export:

```http
GET /api/surveys/export
Authorization: Bearer ADMIN_TOKEN
```

## Error Format

```json
{
  "message": "Validation failed",
  "errors": []
}
```

Common status codes:

`200` success, `201` created, `400` bad request, `401` not logged in, `403` forbidden, `404` not found, `409` duplicate, `422` validation failed, `500` server error.
