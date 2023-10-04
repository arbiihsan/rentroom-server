# Rent-Room API Documentation

## Endpoints:
List Of Available Endpoints For Admin/Staff:
- `POST /register`
- `POST /login`

-  `POST /lodgings`
-  `GET /lodgings`
-  `GET /lodgings/:id`
-  `PUT /lodgings/:id`
-  `PATCH /lodgings/:id`

-  `GET /types`
-  `POST /types`

-  `GET /histories`

## 1. POST /register
Description:
- Create New User and User's data

Request:
- body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

### Response (201 - Created)
```json
{
    "id": "integer",
    "email": "string"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "email cannot be empty"
}
OR
{
    "message": "email cannot be null"
}
OR
{
    "message": "this email has been used"
}
OR
{
    "message": "email must be in email format"
}
OR
{
    "message": "password cannot be empty"
}
OR
{
    "message": "password cannot be null"
}
OR
{
    "message": "Minimum Password's Length is 5 Character"
}
```

## 2. POST /login
Description:
- login with created user's data

Request:
- body:

```json
{
    "email": "string",
    "password": "string"
}
```

### Response (200 - OK)
```json
{
    "access_token": "string",
    "username": "string"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "email cannot be empty"
}
OR
{
    "message": "email cannot be null"
}
OR
{
    "message": "password cannot be empty"
}
OR
{
    "message": "password cannot be null"
}
```

### Response (401 - Unauthorized)
```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /lodgings
Description:
- Create new lodging's data

Request:
- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
}
```

### Response (201 - Created)
```json
{
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "authorId": "integer",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "name cannot be empty"
}
OR
{
    "message": "name cannot be null"
}
OR
{
    "message": "facility cannot be empty"
}
OR
{
    "message": "facility cannot be null"
}
OR
{
    "message": "room capacity cannot be empty"
}
OR
{
    "message": "room capacity cannot be null"
}
OR
{
    "message": "image cannot be empty"
}
OR
{
    "message": "image cannot be null"
}
OR
{
    "message": "image must be in Url format"
}
OR
{
    "message": "price cannot be empty"
}
OR
{
    "message": "price cannot be null"
}
OR
{
    "message": "Minimum price is Rp. 75,000"
}
OR
{
    "message": "typeId cannot be empty"
}
OR
{
    "message": "typeId cannot be null"
}
```

## 4. GET /lodgings
Description:
- Get all lodging from database

Request:
- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)
```json
{
    "lodgings": [
        {
            "id": 1,
            "name": "Rumah 404",
            "facility": "Wifi, Kitchen, TV, Washer, EV charger",
            "roomCapacity": 7,
            "imgUrl": "https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149",
            "authorId": 3,
            "location": "Ubud, Indonesia",
            "price": 1100000,
            "typeId": 1,
            "createdAt": "2023-08-11T07:49:29.385Z",
            "updatedAt": "2023-08-11T07:49:29.385Z",
            "User": {
                "id": 3,
                "username": "open",
                "email": "open@gmail.com",
                "password": "$2a$10$tNrRO.8f5SM/Ze/BC.N10.LlGy545/NrLWcqc/IS8DgbRWhf65xg2",
                "role": "admin",
                "phoneNumber": "087777777779",
                "address": "JL. Medan",
                "createdAt": "2023-08-11T07:49:29.297Z",
                "updatedAt": "2023-08-11T07:49:29.297Z"
            },
            "Type": {
                "id": 1,
                "name": "House",
                "createdAt": "2023-08-11T07:49:28.948Z",
                "updatedAt": "2023-08-11T07:49:28.948Z"
            }
        },
    ]
}
```

## 5. GET /lodgings/:id
Description:
- Get lodging from database by ID

Request:
- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)
```json
{
    "lodging": {
        "id": 4,
        "name": "Hotel 200",
        "facility": "Wifi, Kitchen, TV, Air Conditioning, Hot tub",
        "roomCapacity": 2,
        "imgUrl": "https://images.adsttc.com/media/images/5785/ab8b/e58e/ce38/2200/0098/slideshow/Katamama_RooftopSuite_MainRoom_Dusk.jpg?1468377990",
        "authorId": 3,
        "location": "Kuta Utara, Indonesia",
        "price": 700000,
        "typeId": 4,
        "createdAt": "2023-08-11T07:49:29.385Z",
        "updatedAt": "2023-08-11T07:49:29.385Z"
    }
}
```

## 6. GET /lodgings/:id
Description:
- Get lodging from database by ID

Request:
- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer (required)"
}
```

### Response (200 - OK)
```json
{
    "lodging": {
        "id": 4,
        "name": "Hotel 200",
        "facility": "Wifi, Kitchen, TV, Air Conditioning, Hot tub",
        "roomCapacity": 2,
        "imgUrl": "https://images.adsttc.com/media/images/5785/ab8b/e58e/ce38/2200/0098/slideshow/Katamama_RooftopSuite_MainRoom_Dusk.jpg?1468377990",
        "authorId": 3,
        "location": "Kuta Utara, Indonesia",
        "price": 700000,
        "typeId": 4,
        "createdAt": "2023-08-11T07:49:29.385Z",
        "updatedAt": "2023-08-11T07:49:29.385Z"
    }
}
```

## 7. PUT /lodgings/:id
Description:
- Update lodging from database by ID

Request:
- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
}
```

### Response (201 - Created)
```json
{
    "message": "Lodging with id ${lodgingById.id} has been updated"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "name cannot be empty"
}
OR
{
    "message": "name cannot be null"
}
OR
{
    "message": "facility cannot be empty"
}
OR
{
    "message": "facility cannot be null"
}
OR
{
    "message": "room capacity cannot be empty"
}
OR
{
    "message": "room capacity cannot be null"
}
OR
{
    "message": "image cannot be empty"
}
OR
{
    "message": "image cannot be null"
}
OR
{
    "message": "image must be in Url format"
}
OR
{
    "message": "price cannot be empty"
}
OR
{
    "message": "price cannot be null"
}
OR
{
    "message": "Minimum price is Rp. 75,000"
}
OR
{
    "message": "typeId cannot be empty"
}
OR
{
    "message": "typeId cannot be null"
}
```

## 8. PATCH /lodgings/:id
Description:
- Update lodging status from database by ID

Request:
- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
    "status": "string",
}
```

### Response (201 - Created)
```json
{
    "message": "Lodging with id ${lodgingById.id} has been updated"
}
```

## 9. GET /types
Description:
- Get all types from database

Request:
- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)
```json
{
    "types": [
        {
            "id": 1,
            "name": "House",
            "createdAt": "2023-08-11T07:49:28.948Z",
            "updatedAt": "2023-08-11T07:49:28.948Z"
        },
        {
            "id": 2,
            "name": "Apartment",
            "createdAt": "2023-08-11T07:49:28.948Z",
            "updatedAt": "2023-08-11T07:49:28.948Z"
        },
        {
            "id": 3,
            "name": "Guesthouse",
            "createdAt": "2023-08-11T07:49:28.948Z",
            "updatedAt": "2023-08-11T07:49:28.948Z"
        },
        {
            "id": 4,
            "name": "Hotel",
            "createdAt": "2023-08-11T07:49:28.948Z",
            "updatedAt": "2023-08-11T07:49:28.948Z"
        }
    ]
}
```

## 10. POST /types
Description:
- Create new type's data

Request:
- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
    "name": "string"
}
```

### Response (201 - Created)
```json
{
    "name": "string",
}
```

### Response (400 - Bad Request)
```json
{
    "message": "name cannot be empty"
}
OR
{
    "message": "name cannot be null"
}
```

## 11. GET /histories
Description:
- Get all history from database

Request:
- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)
```json
{
    "histories": [
        {
            "id": 70,
            "name": "test status edited",
            "description": "Lodging with id 33 has been updated",
            "updatedBy": "Arbi Muhammad Ihsan",
            "createdAt": "2023-08-20T02:19:41.390Z",
            "updatedAt": "2023-08-20T02:19:41.390Z"
        },
        {
            "id": 69,
            "name": "test status edited",
            "description": "Lodging with id 33, has been updated to Inactive",
            "updatedBy": "open",
            "createdAt": "2023-08-20T02:18:55.285Z",
            "updatedAt": "2023-08-20T02:18:55.285Z"
        },
        {
            "id": 68,
            "name": "test status edited",
            "description": "Lodging with id 33 has been updated",
            "updatedBy": "open",
            "createdAt": "2023-08-20T02:18:36.409Z",
            "updatedAt": "2023-08-20T02:18:36.409Z"
        },
        {
            "id": 67,
            "name": "test status edited",
            "description": "Lodging with id 33, has been updated to Archived",
            "updatedBy": "open",
            "createdAt": "2023-08-20T02:18:28.629Z",
            "updatedAt": "2023-08-20T02:18:28.629Z"
        },
        {
            "id": 66,
            "name": "(edited) test final",
            "description": "Lodging with id 35, has been updated to Archived",
            "updatedBy": "open",
            "createdAt": "2023-08-20T02:18:09.065Z",
            "updatedAt": "2023-08-20T02:18:09.065Z"
        }
    ]
}
```

## Endpoints:
List Of Available Endpoints For Customer:
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/glogin`

- `GET /customers/lodgings`
- `GET /customers/types`
- `POST /customers/generate-qr`
- `GET /customers/lodgings/:id`

- `GET /customers/bookmarks`
- `POST /customers/bookmarks/:lodgingId`
- `DELETE /customers/bookmarks/:lodgingId`


## 1. POST /customers/register
  Description
  - Create new customer data

  Request: 
  - body:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
  }
  ```

  ### Response (201 - Created)
  ```json
  {
    "id": "integer",
    "email": "string",
  }
  ```

  ### Response (400 - Bad Request)
  ```json
    {
        "message": "email cannot be empty"
    }
    OR
    {
        "message": "email cannot be null"
    }
    OR
    {
        "message": "this email has been used"
    }
    OR
    {
        "message": "email must be in email format"
    }
    OR
    {
        "message": "password cannot be empty"
    }
    OR
    {
        "message": "password cannot be null"
    }
    OR
    {
        "message": "Minimum Password's Length is 5 Character"
    }
  ```
  ## 2. POST /customer/login
  Request:
  - body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  ### Response (200 - OK) 
  ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvcGVuQGdtYWlsLmNvbSIsImlhdCI6MTY5MzEzMjM2Nn0.YbvyJ43lre-y00MGjTr4YAIjhf-zQapCc7ZDPmVYVCg",
        "username": "dimitri",
        "role": "customer",
        "id": 2
    }
  ```
  ### Response (400 - Bad Request)
  ```json
    {
        "message": "email cannot be empty"
    }
    OR
    {
        "message": "email cannot be null"
    }
    OR
    {
        "message": "password cannot be empty"
    }
    OR
    {
        "message": "password cannot be null"
    }
  ```

  ### Response (401 - Unauthorized)
    ```json
    {
    "message": "Invalid email/password"
    }
    ```
  ## 3. GET /customers/lodgings
  Description:
  - Get all lodging from database

  ### Response (200 - OK)
  ```json
  {
    "currentPage": 1,
    "totalPage": 2,
    "data": [
        {
            "id": 12,
            "name": "Luxury Apartment",
            "facility": "Wifi. Gym, Free Park, Near Big Mall",
            "roomCapacity": 6,
            "imgUrl": "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
            "authorId": 1,
            "location": "Bandung",
            "price": 3450000,
            "typeId": 5,
            "status": "Active",
            "createdAt": "2023-10-10T03:10:10.000Z",
            "updatedAt": "2023-10-10T03:10:10.000Z",
            "User": {
                "id": 1,
                "username": "dimitri",
                "email": "dimitri@gmail.com",
                "password": "$2a$10$QRjVXULicyYydj6iclh8Je6Xp7fkSLni1pjrcnxB.msAEkoK1rmtS",
                "role": "admin",
                "phoneNumber": "7777777",
                "address": "test",
                "createdAt": "2023-08-27T05:00:40.246Z",
                "updatedAt": "2023-08-27T05:00:40.246Z"
            },
            "Type": {
                "id": 5,
                "name": "Apartment",
                "createdAt": "2023-08-26T18:01:01.000Z",
                "updatedAt": "2023-08-26T18:01:01.000Z"
            }
        },
    ]
  }
  ```

  ## 4. GET /customers/lodgings/:id
  Description:
  - Get lodging detail by id

  ### Response (200 - OK)
  ```json
  {
    "lodging": {
        "id": 2,
        "name": "Rumah 404",
        "facility": "Wifi, Kitchen, TV, Washer, EV charger",
        "roomCapacity": 7,
        "imgUrl": "https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149",
        "authorId": 1,
        "location": "Ubud, Indonesia",
        "price": 1100000,
        "typeId": 2,
        "status": "Active",
        "createdAt": "2023-08-26T18:01:01.000Z",
        "updatedAt": "2023-08-26T18:01:01.000Z",
        "User": {
            "id": 1,
            "username": "dimitri",
            "email": "dimitri@gmail.com",
            "password": "$2a$10$QRjVXULicyYydj6iclh8Je6Xp7fkSLni1pjrcnxB.msAEkoK1rmtS",
            "role": "admin",
            "phoneNumber": "7777777",
            "address": "test",
            "createdAt": "2023-08-27T05:00:40.246Z",
            "updatedAt": "2023-08-27T05:00:40.246Z"
        },
        "Type": {
            "id": 2,
            "name": "House",
            "createdAt": "2023-08-26T18:01:01.000Z",
            "updatedAt": "2023-08-26T18:01:01.000Z"
        }
    }
  }  
  ```
  ## 5. POST /customers/bookmarks/:lodgingId
  Description:
  - Add lodging to bookmark

  Request:
  - headers:
  ```json
  {
    "access_token": "string"
  }
  ```
  ### Responses (201 - Created)
  ```json
  {
    "message": "Success add bookmark"
  }
  ```
  ### Response (403 - Data Exist)
  ```json
  {
    "message": "Bookmark Already Exist"
  }
  ```
  ### Response (404 - Not Found)
  ```json
  {
    "message": "Lodging not found"
  }
  ```

  ## 6. GET /customers/bookmarks
  Description:
  - Get all bookmark list
  Request:
  - headers:
  ```json
  {
    "access_token": "string"
  }
  ```
  ### Response (200 - OK)  
  ```json
  [
    {
        "id": 8,
        "authorId": 2,
        "lodgingId": 9,
        "createdAt": "2023-08-27T08:38:12.872Z",
        "updatedAt": "2023-08-27T08:38:12.872Z",
        "Lodging": {
            "id": 9,
            "name": "Sky House BSD",
            "facility": "Swimming Pool, Wi-fi, Gym",
            "roomCapacity": 5,
            "imgUrl": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/374880011.jpg?k=7baf8def5b8c4b7d0882c9fcba5a284b8d8f7334d7e2e02851fc954d74c0241c&o=&hp=1",
            "authorId": 1,
            "location": "BSD City Tangerang",
            "price": 3800000,
            "typeId": 5,
            "status": "Active",
            "createdAt": "2023-08-27T03:10:10.000Z",
            "updatedAt": "2023-08-27T03:10:10.000Z",
            "Type": {
                "id": 5,
                "name": "Apartment",
                "createdAt": "2023-08-26T18:01:01.000Z",
                "updatedAt": "2023-08-26T18:01:01.000Z"
            }
        }
    }
  ]
  ```
  ### Response (404 - Not Found)
  ```json
  {
    "message": "Lodging not found"
  }
  ```

  ## 7. DELETE /customers/bookmarks/:lodgingId
  Description:
  - Remove a lodging from bookmark
  
  Request:
  - headers:
  ```json
  {
    "access_token": "string"
  }
  ```
  ### Responses (200 - OK)
  ```json
  {
    "message": "success delete Sky House BSD"
  }
  ```
  ### Response (404 - Not Found)
  ```json
  {
    "message": "Lodging not found"
  } 
  ```

## Global Error

### Response (401 - Unauthorized)
```json
{
  "message": "Invalid token"
}
```

### Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

