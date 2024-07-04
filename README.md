### What is this repository for? ###

* To try and solve ConnectCo's Authentication / Event / Database Abstraction issues.

### How do I get set up? ###

* npm i

### How do I run the program? ###

* npm run start

### How do I exit the program? ###

* To exit `npm run start`:
   - type CTRL + C

### How use the program? ###

* URL: localhost:7000
* replace user Id or customer Id with available selection from users/customers in database.ts

* Perform a GET in the Browser or Postman to `localhost:7000/users/1`
* Perform a GET in the Browser or Postman to `localhost:7000/customers/1`

* Perform a PUT in Postman to `localhost:7000/users/2`
- example data:
{
    "status": "completed",
    "firstName": "Jordan",
    "lastName": "Gordon",
    "role": "admin"
}

* Add `onBehalfOf` header to the PUT request with an appropriate ID (usually admin)
* Perform a PUT in Postman to `localhost:7000/users/2`
- example data:
{
    "status": "completed",
    "firstName": "Jordan",
    "lastName": "Gordon",
    "role": "admin"
}