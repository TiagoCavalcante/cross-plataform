# routes
Endpoint  | Type of operation | explanation
---------:|:-----------------:|:-----------
/users    | GET               | get all users
/user/:id | GET               | get the user with the id `:id`
/user     | POST              | add a new user; it must receive a JSON body with the proprieties `name` (user name), `email` (user's email) and `number` (phone number)
/user/:id | PUT               | update the user with the id `:id`; it can receives a JSON body with the proprieties `name` (user name) and/or `email` (user's email) and/or `number` (phone number)
/user/:id | DELETE            | delete the user with the id `:id`