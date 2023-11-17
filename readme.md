# Authentication & Authorization using Express

Basic express.js project with basic routes:
* Express
* Bcrypt
* NodeMailer
* Joi
* Cors
* Sequelize
* MySQL2
* UUID

---

## URL

_Server_
```
http://localhost:8080
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

## RESTful endpoints

### User Table -- Authentication & Authorization
#### POST /api/auth/register

> Register

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username" : "<username>",
  "role" : "<admin_or_user>" *not required, 
  "email" : "<email>"
  "password" : "<password>"
}
```

_Response (201)_
```
{
    "data": {
      <data_register>
    }
    "status": "Successfully Register User Account"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Email does not same.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" is required"
}
```

---

#### POST /api/auth/login

> Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<email>"
  "password" : "<password>"
}
```

_Response (201)_
```
{
    "token": "token",
    "role": "role",
    "email": "email",
    "status": "Successfully Register User Account"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "User with this email does not exist.",
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Your Password does not correct.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is required"
}
```

---

#### GET /api/user

> Get all user

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {<data_user>},
        {<data_user>}
    ],
    "message": "Success Get All Data User"
}
```

---

#### GET /api/user/:id

> Get user by id

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        <data_user>
    },
    "message": "Success Get Data with ID"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "User with id does not exist.",
}
```

---

#### POST /api/user/forgot-password

> Login

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<email>"
}
```

_Response (201)_
```
{
    "message": "Forgot password process initiated. Check your email for further instructions."
}
```

_Response (404 - Validation Error)_
```
{
    "status": "User with the specified email does not exist.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is required"
}
```

---


### Category
#### GET /api/category

> Get all category

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {<data_category>},
        {<data_category>}
    ],
    "message": "Success Get All Category"
}
```

---

#### GET /api/category/:id

> Get category by id

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        <data_category>
    },
    "message": "Success Get Category with ID"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Category with the specified ID does not exists.",
}
```

---

#### POST /api/category

> Create Category

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
}
```

_Response (201)_
```
{
    "data": {
      <data_category>
    }
    "status": "Successfully Added Category"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Category name does not same.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" is required"
}
```

---


#### PUT /api/category/:id

> Update by id

_Request Params_
```
/<id>
```

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name>",
}
```

_Response (200)_
```
{
    "data": [
        <data_category>
    ],
    "message": "Category updated Successfully"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Category name does not same."
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Forbidden access this route."
}
```

---

#### DELETE /api/category/:id

> Delete by id

_Request Params_
```
/<id>
```

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Category deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Category with the specified ID does not exists"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Forbidden access this route"
}
```

---

### Course
#### GET /api/course

> Get all course

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          <data_course>,
          <Category>: {
            data_category
          }
        },
        {<data_course>},
    ],
    "message": "Success Get All Category"
}
```

---

#### GET /api/course/:id

> Get course by id

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          <data_course>,
          <Category>: {
            data_category
          }
        },
        {<data_course>},
    ],
    "message": "Success Get Course with ID"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Course with the specified ID does not exists",
}
```

---

#### POST /api/course

> Create Course

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title" : "<title>",
  "description" : "<description>",
  "categoryId" : "<categoryId>",
  "adminId" : "<adminId>",
}
```

_Response (201)_
```
{
    "data": {
      <data_course>
    }
    "status": "Successfully Added Course"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Category name does not same.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is required"
}
```

---


#### PUT /api/course/:id

> Update by id

_Request Params_
```
/<id>
```

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title" : "<title>",
  "description" : "<description>",
  "categoryId" : "<categoryId>",
}
```

_Response (200)_
```
{
    "data": [
        <data_course>
    ],
    "message": "Course updated Successfully"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Course title does not same."
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Course with the specified ID does not exists."
}
```

---

#### DELETE /api/course/:id

> Delete by id

_Request Params_
```
/<id>
```

_Request Authorization_
```
<Bearer Token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Course deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Course with the specified ID does not exists"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Forbidden access this route"
}
```

---