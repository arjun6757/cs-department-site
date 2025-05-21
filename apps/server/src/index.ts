import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import session from "express-session";
import API from "./router/api";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./.config/passport.config";
import cors from "cors";
import MongoStore from "connect-mongo";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// connecting to db
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("MongoDB successfully connected!");
    })
    .catch((err) => {
        console.error("MongoDB connection error: ", err);
    });

// middlewares

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }),
);

app.use(express.json());

// for parsing incoming data
app.use(express.urlencoded({ extended: false }));

// global error handling middleware
// to make it global error handling we need to pass 4 arguments

app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET!,

        // session is only saved again if something changed
        resave: false,

        // initially empty store
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),

        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
            sameSite: "none",
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: true, // server only
        },
    }),
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// router setup
app.use("/api", API);

interface E extends Error {
    status?: string;
    statusCode?: number;
}

app.use((err: E, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    });
});

app.get("/", (req, res) => {
    res.send("hi from server");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
