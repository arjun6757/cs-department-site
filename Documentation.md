### Tech Stack :
- **Frontend:** react, tailwindcss, react-router-dom, vite, javascript
- **Backend:** node.js, express, typescript
- **Database:** mongodb
- **Auth:** passport + passport-local (local strategy) + express-session (session management) + mongostore (session store via connect-mongo)

### Libraries :

- **Frontend:** lucide-react (icons)
- **Backend:** nodemon + ts-node (developement), bcrypt (for hashing), multer (for handling multipart/form-data), cors (for enabling CORS), dotenv (for loading environment variables from .env file into process.env), mongoose (for working with mongodb), cloudinary (cloudinary sdk for working with cloudinary)

### Deployment :
- **Frontend:** vercel
- **Backend:** render (sleeps with inactivity)

> [!Note]
> Both deployments were on free plan. Render sleeps with inactivity in free plan, it will take some additional time if that's the case

### API

API router is the main router that gets append to the backend (backend-url/api)

All routes under *API router*
**/route => RouterName => responsible for:**

- /auth => AuthRouter => authentication
- /user => UserRouter => user management
- /entry => EntryRouter => pyq management
- /attendance => AttendanceRouter => attendance management

> [!Note] These route prefixes are added to the main route like this => /api/route

##### AuthRouter
All available routes under *AuthRouter* (request-type/api-endpoint):
- GET/whoami
- POST/login
- POST/signup
- POST/logout
- POST/admin/login
- POST/admin/logout
- POST/forgot-password

*Summary*

**request-type/route-name => responsible for:**

- **GET/whoami =>** getting the user back if it exists in the express-session
- **POST/login =>** authenticating the user using given credentials.
- **POST/signup =>** creating a user with given credentials.
- **POST/logout =>** clearing existing session of a authenticated user
- **POST/admin/login =>** same as */login* but for user role *admin*
- **POST/admin/logout =>** same as */logout* but for user role *admin*
- **POST/forgot-password =>** updating user role *user*

##### UserRouter

All available routes under *UserRouter* (request-type/api-endpoint):

> all routes under this router needs the requesting user to be an admin

- GET/all
- DELETE/delete/:id

*Summary*

**request-type/route-name => responsible for:**

- **GET/all =>** getting all the registered users (with all roles)
- **DELETE/delete/:id =>** permanently deleting a specific user from the db *users* collection (will send an error response if tried on a user with the role admin)

##### EntryRouter

All available routes under *EntryRouter* (request-type/api-endpoint):

- POST/upload
- GET/all
- POST/delete/:id

> /upload and /delete/:id needs the requesting user to be an admin

*Summary*

**request-type/route-name => responsible for:**

- **POST/upload =>** uploading pyqs with pdfs
- **GET/all =>** getting all uploads
- **POST/delete/:id =>** deleting a specific upload

##### AttendanceRouter

All available routes under *AttendanceRouter* (request-type/api-endpoint):

- POST/
- GET/today
- GET/all
- GET/history
- PATCH/update/:id
- GET/user/:id

> apart from */user/:id* all routes under this router needs the user to be an admin

*Summary*

**request-type/route-name => responsible for:**
- **POST/ =>** creating new attendance entry for user (role user) with given status
- **GET/today =>** getting todays attendance report for all users with role *user*. If user has a valid status (present or absent) then it returns that otherwise it return status as null
- **GET/all =>** getting all users attendance in a given timeframe
- **GET/history =>** getting all attendance reports since the beginning
- **PATCH/update/:id =>** updating a specific attendance entry
- **GET/user/:id =>** same as */GET/all* but for a specific user

### Folder structure

#### Root folder structure
```text
client/ => responsbile for frontend, deployed on vercel
server/ => responsbile for backend, deployed on render
.gitignore => for ignoring sensitive files while pushing to git
Documentation.md
package-lock.json --|
package.json      --| needed only if you want to run frontend and backend at once 
Readme.md
```