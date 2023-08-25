# pp-ecom-backend
## curl requests

- health : GET
```
curl --location 'http://localhost:3000/health'
```

- /auth/register : POST
```
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "_id":"vibhav@gmail.com",
    "name":"Vibhav Mishra",
    "password":"vijgvjgfk",
    "email":"vibhav@gmail.com"
}'
```

- /auth/login
```
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: vib-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ2aWJoYXZAZ21haWwuY29tIiwiaWF0IjoxNjkyOTU1NzU5LCJleHAiOjE2OTI5OTg5NTl9.bFiLhckHCtYY52rVsa1IRg_pdCnUugvP33Wk3jf0qao' \
--data-raw '{
    "_id":"vibhav@gmail.com",
    "password":"vijgvjgfk"
}'
```

- /user/overview
```
curl --location 'http://localhost:3000/user/overview' \
--header 'Cookie: vib-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ2aWJoYXZAZ21haWwuY29tIiwiaWF0IjoxNjkyOTU1NzU5LCJleHAiOjE2OTI5OTg5NTl9.bFiLhckHCtYY52rVsa1IRg_pdCnUugvP33Wk3jf0qao'
```