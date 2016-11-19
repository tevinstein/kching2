# kching2

![kching logo](http://i.imgur.com/0HV73sZ.png "kching logo")

##### kching is Tevinstein's submission for a Hacktiv8 portfolio project with
- Node.js 6+
- Express
- MongoDB
- Mongoose

## Installation
- Clone the repo: `git clone https://github.com/tevinstein/kching2.git`
- Install packages: `npm install`
- Create a new file called .env and insert your MongoDB URI in the variable:
```
URI="insert_your_db_uri_here"
SECRET="my-super-secret"
```
- Start the server: `npm start`
- View in browser: `http://localhost:8080`

## REST API
| URL                           | Method | Description                        |
|-------------------------------|--------|------------------------------------|
| /                             | GET    | Renders add financial details page |
| /add                          | POST   | Process financial details          |
| /datas/:id                    | GET    | Renders homepage                   |
| /datas/:id/add                | GET    | Renders add expense page           |
| /datas/:id/add                | POST   | Process add expense                |
| /datas/:id/:expensesid        | GET    | Renders single expense page        |
| /datas/:id/:expensesid/edit   | GET    | Renders edit expense details page  |
| /datas/:id/:expensesid/edit   | POST   | Process edit expense               |
| /datas/:id/:expensesid/delete | GET    | Deletes single expense             |

## Screenshots

![kching index page](http://i.imgur.com/lzejKfE.png "kching index page")

![kching add expense page](http://i.imgur.com/kKWPHdp.png "kching add expense page")

![kching home page](http://i.imgur.com/PWWZkn8.png "kching home page")

![kching expense view page](http://i.imgur.com/NtFKrbD.png "kching expense view page")