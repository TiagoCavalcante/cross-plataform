# routes
Endpoint   | Type of operation | explanation
----------:|:-----------------:|:-----------
/users     | GET               | receive a query param `page`, get all users from between index **(`page` - 1) * 5** and **`page` * 5**
/users/:id | GET               | get the user with the id `:id`
/users     | POST              | add a new user; it must receive a JSON body with the proprieties `name` (user name), `email` (user's email) and `number` (phone number)
/users/:id | PUT               | update the user with the id `:id`; it can receives a JSON body with the proprieties `name` (user name) and/or `email` (user's email) and/or `number` (phone number)
/users/:id | DELETE            | delete the user with the id `:id`