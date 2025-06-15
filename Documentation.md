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

API router is the main router that combines all routes (backend-url/api/router/route)

All routes under *API router*
**/route => RouterName => responsible for:**

- /auth => AuthRouter => authentication
- /user => UserRouter => user management
- /entry => EntryRouter => pyq management
- /attendance => AttendanceRouter => attendance management

> [!Note]
> These route prefixes are added to the main route like this => /api/route

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

```text
client/                                – Frontend code (React + Vite)
├── public/                            – Static assets served directly
│   ├── images/                        – Screenshots or image assets
│   │   ├── demo-desktop.png          – Demo image for desktop UI
│   │   └── demo-mobile.jpeg          – Demo image for mobile UI
│   ├── Inter-VariableFont-opsz,wght.ttf – Custom font used in UI
│   ├── OFL.text                       – Font license file (Open Font License)
│   └── README.txt                    – Notes related to public assets
│
├── src/                               – Main React source code
│   ├── actions/                       – API request handlers for frontend
│   │   ├── attendance.action.json    – Predefined attendance-related actions
│   │   ├── auth.action.js            – Handles login/signup/logout API calls
│   │   ├── entry.action.js           – Functions to manage entry data
│   │   ├── index.js                  – Exports all actions centrally
│   │   └── user.action.js            – Actions for user CRUD operations
│   │
│   ├── admin/                         – Admin dashboard pages
│   │   ├── admin-router.jsx          – Routing for admin-only views
│   │   ├── attendance-history.jsx    – View detailed attendance records
│   │   ├── attendance-summary.jsx    – Summarized attendance report
│   │   ├── attendance.jsx            – Attendance dashboard overview
│   │   ├── mark-attendance.jsx       – Mark attendance manually
│   │   ├── overview.jsx              – Admin landing/overview page
│   │   ├── upload-new.jsx            – Upload new files/documents
│   │   ├── uploads.jsx               – View/manage all uploads
│   │   ├── uploads.layout.jsx        – Layout wrapper for uploads section
│   │   └── users.jsx                 – User list and admin controls
│   │
│   ├── auth/                          – Auth pages and flows
│   │   ├── admin-login.jsx           – Login page for admins
│   │   ├── forgot-password.jsx       – Password recovery page
│   │   ├── login.jsx                 – Login page for users
│   │   └── signup.jsx                – Registration form
│   │
│   ├── context/                       – React context providers
│   │   ├── auth.context.jsx          – Global auth state/context
│   │   └── theme.context.jsx         – Global theme (light/dark) context
│   │
│   ├── dashboard/                     – Dashboard pages
│   │   ├── admin-dashboard.jsx       – Admin dashboard overview
│   │   └── dashboard.jsx             – General user dashboard
│   │
│   ├── user/                          – Pages specific to regular users
│   │   ├── overview.jsx              – Overview of user activity
│   │   ├── pyq.jsx                   – pyq page UI
│   │   └── user-route.jsx            – Routes for user pages
│   │
│   ├── utils/                         – Utility/helper functions
│   │   └── date.js                   – Date-related functions for formatting
│   │
│   ├── App.jsx                        – Root app component, all routes are defined here
│   ├── index.css                     – Global CSS styles
│   ├── index.jsx                     – React DOM render entry
│   └── main.jsx                      – App setup with providers/router
│
├── .env                               – Frontend environment variables
├── .env.example                       – Example of required environment variables
├── eslint.config.js                   – ESLint configuration file
├── index.html                         – HTML template used by Vite
├── package-lock.json                  – Lock file for dependency versions
├── package.json                       – Frontend dependencies and scripts
├── vercel.json                        – Vercel deployment config
└── vite.config.js                     – Vite bundler and plugin settings

server/                                – Backend code (Node.js + TypeScript)
├── src/
│   ├── .config/                       – Configurations (e.g., auth)
│   │   └── passport.config.ts        – Passport.js setup for authentication
│   │
│   ├── controllers/                   – Business logic for routes
│   │   ├── attendance.controller.ts  – Handles attendance operations
│   │   ├── auth.controller.ts        – Login, signup, session handlers
│   │   ├── entry.controller.ts       – Handles entry data operations (pyq)
│   │   └── user.controller.ts        – User CRUD logic
│   │
│   ├── middleware/                    – Functions run before/after route handlers
│   │   ├── isadmin.middleware.ts     – Ensures requestor is an admin
│   │   ├── isauthenticated.middleware.ts – Ensures requestor is logged in
│   │   └── multer.middleware.ts      – Handles file uploads with multer
│   │
│   ├── models/                        – Database schemas (likely MongoDB)
│   │   ├── attendance.model.ts       – Schema for attendance data
│   │   ├── entry.model.ts            – Schema for entries
│   │   └── user.model.ts             – Schema for user accounts
│   │
│   ├── router/                        – API route definitions
│   │   ├── api.ts                    – Main router that combines all routes
│   │   ├── attendance.router.ts      – Routes for attendance endpoints
│   │   ├── auth.router.ts            – Routes for login/signup
│   │   ├── entry.router.ts           – Routes for entry records
│   │   └── user.router.ts            – Routes for user management
│   │
│   ├── uploads/                       – Temporary storage for uploaded PDFs
│   │   └── (temporary storage for PDFs before uploading to Cloudinary)
│   │
│   ├── utils/                         – Helper utilities
│   │   └── cloudinary.util.ts        – helper functions related to Cloudinary
│   │
│   └── index.ts                       – Entry point for Express app
│
├── .env                               – Backend environment variables
├── .env.example                       – Example backend env config
├── package-lock.json                  – Backend dependency lock file
├── package.json                       – Backend scripts and dependencies
└── tsconfig.json                      – TypeScript configuration

.gitignore                             – Files and folders to ignore in Git
Documentation.md                       – Full project documentation
package-lock.json                      – Lock file for root (primarily used during developement; not meant for direct use in production)
package.json                           – Root-level package file (primarily used during developement; not meant for direct use in production)
README.md                              – Main readme for the whole project
```