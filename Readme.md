![Image](https://github.com/user-attachments/assets/33fd3868-a02b-4979-b78c-74119dda495f)

<div align="center">
    A simple fullstack app to mimic a college site — built with the MERN stack.
</div>

### Features :

- Role based access
- Attendance management
- Easily upload (admin) & download PYQs (user, admin)
- Basic User management

### Run it locally :

Clone the project

```bash
git clone https://github.com/arjun6757/cs-department-site
```

Go to the project directory

```bash
cd cs-department-site
```

Install dependencies

```bash
cd client && npm install
cd ..
cd server && npm install
```

Create `server/.env` file (or rename existing `.env.example` to `.env`) with the following content and replace it with your values

```text
NODE_ENV=local
EXPRESS_SESSION_SECRET=<your_express_session_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
FRONTEND_URL=<your_frontend_url>
MONGO_LOCAL_URI=<your_mongo_local_uri>
```

Start dev environment by running the following commands in the root directory (in two separate terminal instances):

```bash
cd client && npm run dev
```

```bash
cd server && npm run dev
```

[ Optional ] if you wanna run both dev servers simultaneously then you can do so by running this command in root directory:

```bash
npm install && npm run dev
```

Now you should be able to see the app running on http://localhost:5173.
