import express, { Request, Response, NextFunction } from "express";
import passport from "passport"
import session from "express-session"
import API from "./router/api";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./.config/passport";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

// connecting to db
mongoose
.connect(process.env.MONGO_URI!)
.then(() => {
    console.log("MongoDB successfully connected!")
})
.catch(err => {
    console.error(err)
});

// middlewares

// for parsing json data and append to req object
app.use(express.json());

// for parsing incoming data
app.use(express.urlencoded({ extended: false }))

// global error handling middleware
// to make it global error handling we need to pass 4 arguments

interface E extends Error {
    status?: string;
    statusCode?: number;
}

app.use((err: E, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({ 
        status: err.statusCode,
        message: err.message
    })
})

app.use(session({

    secret: process.env.EXPRESS_SESSION_SECRET || "local",

    // session is only saved again if something changed
    resave: false,

    // initially empty store
    saveUninitialized: false
}))

// passport setup
app.use(passport.initialize())
app.use(passport.session())

// router setup
app.use("/api", API);

app.get("/", (req, res) => {
	res.send("hi from moon");
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
})
